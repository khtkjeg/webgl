#!/usr/bin/env python3.5
# -*- coding: utf-8 -*-
# @Time    : 2016/9/21 10:51
# @Author  : Luming
# @Site    : 
# @File    : data2uv.py
# @Software: PyCharm Community Edition

import json
import math
from numpy  import *
if __name__ == '__main__':
    def finddata(srcdata,lat,lon):
        for j in range(0,len(srcdata),1):
            if lat==int(srcdata[j]['lat']) and lon==int(srcdata[j]['lon']):
                print(srcdata[j])
                return srcdata[j]
        return ''
    def data2uv(spd,dir):
        result={}
        tmp = (270.0 - dir) * math.pi / 180.0
        result['u'] = round(spd * math.cos(tmp),4)
        result['v'] = round(spd * math.sin(tmp),4)
        return result
    try:

        fd_wind=open('全国风场格点201512实况数据.txt','r',encoding='utf8')
        winddata=fd_wind.read().split('\n')
        fd_wind.close()
        fd_uv = open('fgs1.json', 'r', encoding='utf8')
        uvdata = fd_uv.read()
        fd_uv.close()
        uvdataJson = json.loads(uvdata)

        dateobj={}
        dataarry = []
        startdate = '20151201'
        enddate = '20151230'

        for i in range(1,len(winddata)):
            arry=winddata[i].split(',')
            obj={}
            obj['lon']=arry[1]
            obj['lat'] =arry[2]
            obj['dir'] =arry[3]
            obj['spd'] =arry[4]
            if startdate == str(arry[0]):
                dataarry.append(obj)
            else:
                dateobj[startdate]=dataarry
                dataarry=[]
                dataarry.append(obj)
                startdate=arry[0]
        dateobj[enddate] = dataarry

        umatrix = zeros([181, 360])
        vmatrix = zeros([181, 360])

        for jsondata in dateobj:
            if jsondata=='20151230':
                nx = 0
                for x in range(90,-91,-1):
                    ny = 0
                    uarry=zeros(360)
                    varry =zeros(360)
                    for y in range(0,360,1):
                        fdobj=finddata(dateobj[jsondata], x, y)
                        if fdobj=='':
                            uarry[ny] = 0
                            varry[ny] = 0
                        else:
                            uarry[ny] = data2uv(int(fdobj['spd']),int(fdobj['dir']))['u']
                            varry[ny] = data2uv(int(fdobj['spd']), int(fdobj['dir']))['v']
                        ny=ny+1
                    umatrix[nx] = uarry
                    vmatrix[nx] = varry
                    nx=nx+1

        uvdataJson[0]['data'] = umatrix.flatten().tolist()
        uvdataJson[1]['data'] = vmatrix.flatten().tolist()


        file_object = open('20151230.json', 'w')
        file_object.write(json.dumps(uvdataJson))
        file_object.close()
    except Exception as err:
        print('err:',err)