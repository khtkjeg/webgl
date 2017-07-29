#!/usr/bin/env python3.5
# -*- coding: utf-8 -*-
# @Time    : 2016/9/21 16:36
# @Author  : Luming
# @Site    : 
# @File    : test.py
# @Software: PyCharm Community Edition
import numpy  as np
import json
import math
a=np.zeros([3,3])
a[0:]=[1,1,1]
#a[1:]=[2,2,2]
#a[2:]=[3,3,3]
b=a.flatten()
c=json.dumps(b.tolist())
print(b)
