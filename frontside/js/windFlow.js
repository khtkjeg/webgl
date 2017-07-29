define(['./windy'], function(W) {

    function init(callback) {

        $.getJSON('data/fgs1.json', function(json) {

            var canvas = document.createElement('canvas');


            var width = canvas.width = 4096;
            var height = canvas.height = 2048;

            var windy = new W.Windy({
                canvas: canvas,
                data: json
            });


            var extent = {
                xmax: 180,
                xmin: -180,
                ymax: 77.55943984614527,
                ymin: -46.74495719499965
            };

            setTimeout(function() {
                windy.start(
                    [
                        [0, 0],
                        [width, height]
                    ],
                    4096,
                    2048, [
                        [extent.xmin, extent.ymin],
                        [extent.xmax, extent.ymax]
                    ]
                );
            }, 300);



            callback(canvas);

        })
    }



    return {

        init: init
    }

})
