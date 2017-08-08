
$(document).ready(function() {
    let puzzle = getPuzzle();
    puzzle === 'undefined' ? alert('puzzle does not exist') : fillIn(puzzle);
    $('#validate').on('click', validate);
});

function getPuzzle(){
   let puzzle = document.location.search;
   puzzle = puzzle.substr(puzzle.indexOf('=')+1);
   return puzzle;
}

function fillIn(puzzle){
  for (var i = 0, p = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++, p++) {
      if(puzzle[p] !== '-') $('input[data-row="'+i+'"][ data-column="'+j+'"]').val(puzzle[p]);
    }
  }
}

function validate(){
    $('#result').removeClass();
    hasWon() ? $('#result').addClass('win').text('Correct!') : $('#result').addClass('lose').text('Not yet...');
}

function hasWon(){
    //check 9 rows and 9 columns
    for(let i=0; i<9; i++){
        for(let j=0, attr = 'data-row'; j<2; j++, attr = 'data-column'){
            let obj = {};
            let good = true;
            $('input['+attr+'="'+i+'"]').each(function(){
                let val = +$(this).val();
                val === '' || val in obj || isNaN(val) || val === 0 ? good = false : obj[val] = true;
            })
            if(!good) return false;
        }
    }
    //check 9 boxes
    for (var i = 0; i < 9; i++) {
        let obj = {};
        let good = true;
        for (var j = 0; j < 9; j++) {
            let row = (Math.floor(i / 3) * 3 + Math.floor(j / 3));
            let col = ((i % 3) * 3 + j % 3);
            let val = +$('input[data-row="'+row+'"][data-column="'+col+'"]').val();
            val === '' || val in obj || isNaN(val) || val === 0 ? good = false : obj[val] = true;
        }
        if(!good) return false;
    }
    return true;
}