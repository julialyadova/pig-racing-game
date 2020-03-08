
var context = null;
var canvas = null;
var scaleSqr = 16;
var score = 0;
var pause = false;
var bet = 0;

var pigFrame = 0;
var pigsXs = {0: 0, 1: 0,2: 0,3: 0};

function loadImages(sources, callback)
{
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for(var src in sources)
    {
      numImages++;
    }
    for(var src in sources)
    {
      images[src] = new Image();
      images[src].onload = function()
      {
        if(++loadedImages >= numImages)
        {
          callback(images);
        }
      };
      images[src].src = sources[src];
    }
  }

  var sources = 
  {
    0:     './tex/pig0.png',
    1:     './tex/pig1.png',
    2:     './tex/pig2.png',
    3:     './tex/pig3.png',
    pig:   './tex/pig0.png',
  };

  function getRandomInt(max)
  {
    return Math.floor(Math.random() * Math.floor(max));
  }


document.addEventListener('keydown', function(event)
{
    if (event.code == '1') 
    {
        bet = 0;
    } else if(event.code == '2') 
    {
        bet = 1;
    } else if(event.code == '3') 
    {
        bet = 2;
    }else if(event.code == '4') 
    {
        bet = 3;
    }else if(event.code == "KeyP")
    {
        pause = !pause;
    }
  });
document.addEventListener("DOMContentLoaded", function ()
{
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext("2d");

    context.canvas.width = scaleSqr * 8;
    context.canvas.height = (scaleSqr-1) * 8;


    setInterval(function()
    {
        if(pause)
        {
            return;
        }

        loadImages(sources, function(images)
        {

            context.clearRect(0, 0, canvas.width, canvas.height);

            for(var n = 0; n < 4; n++)
            {   
                context.drawImage(images[pigFrame], pigsXs[n], n * scaleSqr, scaleSqr * 1.5, scaleSqr);

                if (pigsXs[n] > scaleSqr*6)
                {
                    pause = true;
                    document.location.reload(true);
                }

                pigsXs[n] += getRandomInt(4);
            }

            pigFrame++;
            if (pigFrame > 3)
            {
              pigFrame = 0;
            }
        });
    }, 100);
});