var contSlct = $('.container');
var timeBlkSlct = $('.timeblock')
var textBlkSlct = $('')
var timeBlk = '<div class="time-block row">';
var textBlk = '<div class="past text-block">';
var hourBlk = '<div class="hour">';
var saveBlk = '<button class="saveBtn">';

function renderTimeBlocks() { 
        $('.container').empty();
            console.log('Planner Recharged');
        for(let i = 0; i < 12; i++){
            var Blk = $('<div>');
            Blk.addClass("time-block", "row");
            Blk.attr("id", "TB"+i);
            $('.container').append(Blk);
            
            if(i < 4){
                var tBlk = $(hourBlk);
                tBlk.text((i + 9) + "  A.M.");
                tBlk.attr("data-time", i + 9);
                
                $('#TB' + i).append(tBlk);
            } else {
                var tBlk = $(hourBlk);
                tBlk.text((i - 3) + "  P.M.");
                tBlk.attr("data-time", i);
                
                $('#TB' + i).append(tBlk);
            }

                var txt = $(textBlk)
                txt.attr("id", "text-"+i);
                
                $('#TB' + i).append(txt);
                
                var input = $('<textarea>')
                input.attr("id", "input-" + i );

                $('#text-' + i).append(input);

                var svBtn = $(saveBlk);
                svBtn.attr("id", 'save-' + i);

                $('#TB' + i).append(svBtn);

        }
    

        //$('#TB' + i).append(txBlk);
        //$('#TB' + i).append('<textarea>');
        //$('#TB' + i).append('<form>');
}

renderTimeBlocks();

//Button Event Listeners
$(document).on('click', '.saveBtn', function(e) {
    
    for(i = 0; i < 12; i++){
    
        var input = $('#input-' + i)
        
        if(typeof input.val() == 'string') {
        var txt = input.val().trim();
        
        console.log(txt);
        
        var pTag = $('<p>');
        pTag.text(txt);
        $('#text-' + i).append(pTag);
        }

        //var input = $('<textarea>')
        //input.attr("id", "input-" + i );

        //$('#text-' + i).append(input);
    }

});
