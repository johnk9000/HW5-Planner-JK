var contSlct = $('.container');
var timeBlkSlct = $('.timeblock')
var textBlkSlct = $('')
var timeBlk = '<div class="time-block row">';
var textBlk = '<div class="past text-block">';
var hourBlk = '<div class="hour">';
var saveBlk = '<button class="saveBtn">';

var isSaved = false;
var savedText = [];
var wrkHrs = 16;
var startHr = 8;

var timeLocal = moment().format('LT');
var dateLocal = moment().format('LD');
var timeHr = moment().format("HH");
var noBlur = false;

renderTimeBlocks();

$('#currentDay').text(dateLocal + " | " + timeLocal);

function loadText () {
    console.log('loading text')
    
    if(savedText !== null){
        isSaved = true;
        savedText = JSON.parse(localStorage.getItem("saved-input"));
    } else {
        isSaved = false;
        }
    }


function renderTimeBlocks() { 
        //event.preventDefault();
        loadText();

        $('.container').empty();
            console.log('Planner Recharged');
        for(let i = 0; i < wrkHrs; i++){
            var Blk = $('<div>');
            Blk.addClass("time-block", "row");
            Blk.attr("id", "TB"+i);
            $('.container').append(Blk);
            
            if(i < (12 - startHr + 1)){
                var tBlk = $(hourBlk);
                tBlk.text((i + startHr) + "  A.M.");
                tBlk.attr("data-time", i + startHr);
                
                $('#TB' + i).append(tBlk);
            } else {
                var tBlk = $(hourBlk);
                tBlk.text((i + startHr - 12) + "  P.M.");
                tBlk.attr("data-time", i);
                
                $('#TB' + i).append(tBlk);
            }

                var txt = $(textBlk)
                txt.attr("id", "text-"+i);
                if(timeHr < (startHr + i)){
                    txt.addClass("future");
                } else if (timeHr == (startHr + i)){
                    txt.addClass("present");
                } else {
                    txt.addClass("past");
                }
                
                $('#TB' + i).append(txt);
                
                var input = $('<textarea>')
                input.attr("id", "input-" + i );

                if(timeHr > (startHr + i)){
                input.addClass("blur");
                }

                
                input.text(savedText[i]);
                

                $('#text-' + i).append(input);

                var svBtn = $(saveBlk);
                svBtn.attr("id", 'save-' + i);
                svBtn.text("SAVE");

                $('#TB' + i).append(svBtn);

        }

        if(noBlur){
            removeBlur();
        }
}


function removeBlur() {
    for(i = 0; i < wrkHrs; i++){
        $("#input-" + i).removeClass("blur");
    }
}

function toggleStatus(e) {
    //e.preventDefault()
    var checked = e.target.checked;
  
    if (checked) {
        renderTimeBlocks();
    } else {
        noBlur = false;
      removeBlur();
    }
}

//Button Event Listeners
$(document).on('click', '#status-toggle', toggleStatus);

$(document).on('click', '.saveBtn', function(e) {
    e.preventDefault()
var savedText = [];
    for(i = 0; i < wrkHrs; i++){
        var input = $('#input-' + i)
        if(typeof input.val() == 'string') {
            var txt = input.val().trim();
            savedText.push(txt);
            localStorage.setItem("saved-input", JSON.stringify(savedText));
        } else {
            savedText.push("");
            localStorage.setItem("saved-input", JSON.stringify(savedText));
        }
    }
    renderTimeBlocks()

});


