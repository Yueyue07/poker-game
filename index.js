
var inputCard = process.argv;


var inputs1 = GetHandFromCL(inputCard[2]);
var inputs2 = GetHandFromCL(inputCard[3]);


console.log(GetHandType(inputs1[0],inputs1[1]));
console.log(GetHandType(inputs2[0],inputs2[1]));


function GetHandFromCL(input) {

  var object = {};
  // object: save each suit as property
  //and value as array to save each card's number
  var array = [];
  // array: save each card number
  //and ingnore its suit
  var inputCardsArray = input.split(' ');
  console.log(inputCardsArray);
  inputCardsArray.forEach(function(card) {
    if (card.length > 1) {
      var itemsArray = card.split(':');

      if (object[itemsArray[0]] === undefined) {
        object[itemsArray[0]] = [];
        object[itemsArray[0]].push(itemsArray[1]);
      } else {
        object[itemsArray[0]].push(itemsArray[1]);
      }

      array.push(card.split(':')[1]);
    }
  });
  return [object,array];
}

function TransCardToNum(array) {
  var arrayNumsOfCards = [];

  array.forEach(function(item) {
    if (parseInt(item)) {
      arrayNumsOfCards.push(parseInt(item));
    } else {
      switch(item) {
        case 'J':
          arrayNumsOfCards.push(11);
          break;
        case 'Q':
          arrayNumsOfCards.push(12);
          break;
        case 'K':
          arrayNumsOfCards.push(13);
          break;
        case 'A':
          arrayNumsOfCards.push(1);
      }
    }
  });

  return arrayNumsOfCards;
}

function GetHandType(object, array) {
  var suitLength = Object.keys(object).length;
  if (suitLength === 1) { // Fluss Case
    var arrayNumsOfCards = TransCardToNum(array);
    // Check is Straight Flush ?
     arrayNumsOfCards.sort();

     // edge case [ 1, 10, 11, 12, 13 ]
     if ( arrayNumsOfCards[0] === 1 && arrayNumsOfCards[arrayNumsOfCards.length - 1] === 13) {
       for (var i = 2; i < arrayNumsOfCards.length - 1; ++i) {

          if(arrayNumsOfCards[1] !== 10) {

            return 'Flush';
          }
          if (arrayNumsOfCards[i] - arrayNumsOfCards[ i - 1] !== 1) {
               console.log('inside');
            return 'Flush';
          }
       }

       return 'StraightFlush';
     } else { // normal case
       for (var i = 1; i < arrayNumsOfCards.length; i++) {
         if ( array[i] - array[i - 1] !== 1 ) return 'Flush';
       }
       return 'StraightFlush';
       console.log(GetHandType(object,array));
     }

  } else {
    // check pair
    var arrayNumsOfCards = TransCardToNum(array);
    // change array string to array with number
    var dictrionaryOfCardNum = {};

    console.log(arrayNumsOfCards);

    arrayNumsOfCards.forEach(function(num) {
      var key = num.toString();
      if (dictrionaryOfCardNum[key] === undefined) {
        dictrionaryOfCardNum[key] = 1;
      } else {
        dictrionaryOfCardNum[key] += 1;
      }
    });
    var Length = Object.keys(dictrionaryOfCardNum).length;
    if (Length === 2) {

      for (var key in dictrionaryOfCardNum) {
        // Four of A Kind
        if (dictrionaryOfCardNum[key] === 4 || dictrionaryOfCardNum[key] === 1) {
          console.log(dictrionaryOfCardNum);
          return 'FourOfAKind';
        }
        // Full House
        if (dictrionaryOfCardNum[key] === 3 || dictrionaryOfCardNum[key] === 2) {
          console.log(dictrionaryOfCardNum);
          return 'FullHouse';
        }
      }

    }

    if (Length === 3) {

      for (var key in dictrionaryOfCardNum) {
        // Tree Of A Kind
        if (dictrionaryOfCardNum[key] === 3) {
          console.log(dictrionaryOfCardNum);
          return 'ThreOfAKind';
        }
        // Two Pairs
        if (dictrionaryOfCardNum[key] === 2) {
          console.log(dictrionaryOfCardNum);
          return 'TwoPairs';
        }
      }
    }

    if (Length === 4) {
      // One Pair
      return 'OnePair';
    }

    if (Length === 5) {
      //Straight || High Card
      var array = [];
      for (var key in dictrionaryOfCardNum) {
        array.push(parseInt(dictrionaryOfCardNum[key]));
      }

      array.sort();
      for (var i = 0; i < array.length - 1; i++) {
        if (array[i + 1] - array [i] !== 1) {
          return 'HighCard'
        }
      }
      return 'Straight';
    }
  }
};
