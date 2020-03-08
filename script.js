
var context = null;
var canvas = null;
var scaleSqr = 16;
var score = 0;
var pause = false;
var betsOpen = true;
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

function endRace(winner)
{
    if (winner == bet)
      context.fillText((winner + 1) + " wins! :)", canvas.width/2, scaleSqr * 6);
    else 
      context.fillText((winner + 1) + " wins... :|", canvas.width/2, scaleSqr * 6);
    
    context.fillText("choose a pig", canvas.width/2, scaleSqr * 7);
    pause = true;
    betsOpen = true;
    bet = null;
    pigsXs = {0: 0, 1: 0,2: 0,3: 0};
}

  var sources = 
  {
    0:     './tex/pig0.png',
    1:     './tex/pig1.png',
    2:     './tex/pig2.png',
    3:     './tex/pig3.png',
    pig:   './tex/pig0.png',
    stripe:'./tex/stripe.png',
    finish:'./tex/finish.png',
  };

  function getRandomInt(max)
  {
    return Math.floor(Math.random() * Math.floor(max));
  }


document.addEventListener('keydown', function(event)
{

    if (!betsOpen)
    {
      return;
    } else if (event.code == 'Space' && bet != null)
    {
        pause = false;
        betsOpen = false;
    } else if (event.code == 'Digit1') 
    {
        bet = 0;
        pause = false;
    } else if(event.code == 'Digit2') 
    {
        bet = 1;
        pause = false;
    } else if(event.code == 'Digit3') 
    {
        bet = 2;
        pause = false;
    }else if(event.code == 'Digit4') 
    {
        bet = 3;
        pause = false;
    }
  });
document.addEventListener("DOMContentLoaded", function ()
{
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext("2d");

    //размер
    context.canvas.width = scaleSqr * 8;
    context.canvas.height = (scaleSqr-1) * 8;

    //шрифты
    context.font = "12px Arial";
    context.fillStyle = "#84ffff";
    context.textAlign = "center";


    setInterval(function()
    {
        if(pause)
        {
            return;
        }

        loadImages(sources, function(images)
        {

            context.clearRect(0, 0, canvas.width, canvas.height);

            var winner = -1;

            //отрисовка свиней перед началом гонки
            if (betsOpen){
              for(var n = 0; n < 4; n++)
              {   
                  context.drawImage(images.pig, pigsXs[n], n * scaleSqr, scaleSqr * 1.5, scaleSqr);
                  if (n == bet)
                  {
                    context.drawImage(images.stripe, pigsXs[n] + scaleSqr, n * scaleSqr, scaleSqr/2, scaleSqr/2);
                  }
                  //отрисовка финишной ленты
                  context.drawImage(images.finish, 6.25*scaleSqr, n * scaleSqr, scaleSqr, scaleSqr);
              }
              //отображение ставки
              context.fillText((bet + 1), canvas.width/2, scaleSqr * 6);

              pause = true;
              return;
            }

            //отрисовка свиней
            for(var n = 0; n < 4; n++)
            {   
                context.drawImage(images[pigFrame], pigsXs[n], n * scaleSqr, scaleSqr * 1.5, scaleSqr);

                if (n == bet)
                {
                  context.drawImage(images.stripe, pigsXs[n] + scaleSqr, n * scaleSqr, scaleSqr/2, scaleSqr/2);
                }

                //отрисовка финишной ленты
                context.drawImage(images.finish, 6.25*scaleSqr, n * scaleSqr, scaleSqr, scaleSqr);

                //проверка на победу
                if (pigsXs[n] > scaleSqr*5)
                {
                    winner = n;
                }

                pigsXs[n] += getRandomInt(4);
            }

            if (winner > -1)
            {
              endRace(winner)
            }

            //смена картинки для "анимации"
            pigFrame++;
            if (pigFrame > 3)
            {
              pigFrame = 0;
            }
        });
    }, 100);
});