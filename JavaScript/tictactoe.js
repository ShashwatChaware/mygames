// Variables for the entire game or rounds.
var rounds;
var round_no ;
var x_score ;
var o_score ;
var draw_score ;

var game_type ;         // 0 for unchecked 1 for 1player , 2 for immposible , 3 for 2player








// Variables for the single round. 
var grid_arr1 = [["N","N","N"],["N","N","N"],["N","N","N"]];
var grid_arr = [[],[],[]];
var win_row ;
var win_colomn ; 
var win_diagonal ;
var random_no1 ;
var random_no2 ;
var grid_no ;
var flag ;
var turn = "X";


function reset_scores() {
    clean_grid();
    setTimeout(() => {
        turn = "X" ;
        draw_score = 0;
        x_score = 0;
        o_score = 0;
        round_no = 0;
    }, 500);
    
    setTimeout(update_scores , 1000);
}


function restart_round() {
    clean_grid();

}

function new_game() {
    reset_scores();
    rounds = 0;
    display_input_rounds();
    turn = "X" ;
    // Turn indicator initialize at X
    document.getElementById("x_score_button").style.backgroundColor = "rgb(115, 255, 102)" ;    
    document.getElementById("o_score_button").removeAttribute("style");
}


function update_scores() {
    document.getElementById("x_score").innerHTML = x_score;
    document.getElementById("o_score").innerHTML = o_score;
}

function play_mode(element) {
    // As impossible mode is not currently available. 
    game_type = element.value;
    if ((game_type == 1) || (game_type == 3)) {
        document.getElementById("new_game_button").disabled = false ;
        document.getElementById("reset_score_button").disabled = false ;
    }
    else {
        alert("Impossible mode is not currently available !! Coming Soon..")
    }
}


function block_grid() {
    game_type = 0;
    if (game_type == 0) {
        document.getElementById("grid").style.display = "none";
        document.getElementById("fake_grid").style.display = "block";

    }
}

function unblock_grid() {
    if ((game_type == 3) || (game_type == 1)) {
        document.getElementById("grid").style.display = "block";
        document.getElementById("fake_grid").style.display = "none";
    }
}


function input_rounds() {
    rounds = document.getElementById("rounds").value ;
    // console.log(rounds);
    round_no = 1;
    x_score = 0 ;
    o_score = 0 ;
    draw_score = 0 ;
    setTimeout(hide_input_rounds , 1000);
    unblock_grid();
}

function display_input_rounds() {
    document.getElementById("input_rounds_form").style.display = "block";
    //game_type = 3;
}

function hide_input_rounds() {
    document.getElementById("input_rounds_form").style.display = "none";
}


function turn_swap() {
    if (turn == "X") {
        turn = "O" ;
        document.getElementById("o_score_button").style.backgroundColor = "rgb(255, 109, 109)" ;
        // document.getElementById("x_score_button").style.backgroundColor = "none" ;
        document.getElementById("x_score_button").removeAttribute("style");
        if (game_type == 1) {
            console.log("hurrey" , random_cpu_grid_id)
            select_box(random_cpu_grid_id());
        }
    }
    else {
        turn = "X"
        document.getElementById("x_score_button").style.backgroundColor = "rgb(115, 255, 102)" ;
        // document.getElementById("o_score_button").style.backgroundColor = "none" ;
        document.getElementById("o_score_button").removeAttribute("style");
    }
}


function random_cpu_grid_id() {
    random_no1 = Math.floor((Math.random() * 3));
    random_no2 = Math.floor((Math.random() * 3));
    while ((grid_arr[random_no1][random_no2] == "X") || (grid_arr[random_no1][random_no2] == "O")) {
        random_no1 = Math.floor((Math.random() * 3));
        random_no2 = Math.floor((Math.random() * 3));
    }

    var random_grid_id = "grid_" + String(random_no1) + String(random_no2);
    return random_grid_id

}


function grid_status(grid_id) {
    if (grid_arr[grid_id[5]][grid_id[6]] == undefined) {
        return true
    }
    else {
        return false
    }

}



function select_box(grid_id) {
    if (grid_status(grid_id)) {
        if (turn == "X") {
            document.getElementById(grid_id).innerHTML = "X";
            document.getElementById(grid_id).className = "box_X";
            grid_arr[grid_id[5]][grid_id[6]] = turn ;
            console.log(grid_arr) ;
            
            if (check_win(parseInt(grid_id[5]),parseInt(grid_id[6]))) {
                console.log("X WIn !!!!!!!!!!");
                setTimeout(win_change_style , 500);
                setTimeout(clean_grid , 1500);
                setTimeout(pop_up_win , 2000);
                x_score++ ;
                // $('exampleModal').modal('toggle');
            }
            else {
                turn_swap();
                if (check_draw()){
                    setTimeout(clean_grid , 1500);
                    draw_score++ ;
                }
            }
            
            
        }
        else {
            document.getElementById(grid_id).innerHTML = "O";
            document.getElementById(grid_id).className = "box_O";
            grid_arr[grid_id[5]][grid_id[6]] = turn ;
            console.log(grid_arr) ;
 
            if (check_win(parseInt(grid_id[5]),parseInt(grid_id[6]))) {
                console.log("O WIn !!!!!!!!!!");
                setTimeout(win_change_style , 500);
                setTimeout(clean_grid , 1500);
                o_score++ ;
                // $('exampleModal').modal('toggle');
            }
            else {
                turn_swap();
                if (check_draw()){
                    setTimeout(clean_grid , 1500);
                    draw_score++ ;
                }
            }
        }
    }
      
}

function check_draw() {
    flag = true;
    for (i=0; i<3; i++) {
        for (j=0; j<3; j++) {
            if (grid_arr[i][j] == undefined) {
                flag = false;
                return flag
            }
        }
    }
    return flag
}

function check_win(row , column) {
    if (((check_row(row)==true) || (check_column(column)==true)) || ((check_diagonal1()==true) || (check_diagonal2()==true)) ) {
        return true
    }
    else {
        false
    }
}

function check_row(row) {
    var current_row = (grid_arr[row][0] + grid_arr[row][1] + grid_arr[row][2]);
    if ((current_row == "XXX") || (current_row == "OOO")) {
        win_row = row;
        return true
    }
    else {
        return false
    }
}

function check_column(column) {
    var current_column = (grid_arr[0][column] + grid_arr[1][column] + grid_arr[2][column])
    if ((current_column == "XXX") || (current_column == "OOO")) {
        win_colomn = column;
        return true
    }
    else {
        return false
    }
}

function check_diagonal1() {
    var current_diagonal1 = (grid_arr[0][0] + grid_arr[1][1] + grid_arr[2][2]);
    if ((current_diagonal1 == "XXX") || (current_diagonal1 == "OOO")) {
        win_diagonal = 1;
        return true
    }
    else {
        return false
    }
} 

function check_diagonal2() {
    var current_diagonal2 = (grid_arr[0][2] + grid_arr[1][1] + grid_arr[2][0]);
    if ((current_diagonal2 == "XXX") || (current_diagonal2 == "OOO")) {
        win_diagonal = 2;
        
        return true
    }
    else {
        return false
    }
} 

function win_change_style() {
    if (win_diagonal == 1) {
        document.getElementById("grid_00").className = "win_box";
        document.getElementById("grid_11").className = "win_box";
        document.getElementById("grid_22").className = "win_box";
    }

    if (win_diagonal == 2) {
        document.getElementById("grid_02").className = "win_box";
        document.getElementById("grid_11").className = "win_box";
        document.getElementById("grid_20").className = "win_box";
    }

    if (win_row == 0) {
        document.getElementById("grid_00").className = "win_box";
        document.getElementById("grid_01").className = "win_box";
        document.getElementById("grid_02").className = "win_box";
    }
    if (win_row == 1) {
        document.getElementById("grid_10").className = "win_box";
        document.getElementById("grid_11").className = "win_box";
        document.getElementById("grid_12").className = "win_box";
    }
    if (win_row == 2) {
        document.getElementById("grid_20").className = "win_box";
        document.getElementById("grid_21").className = "win_box";
        document.getElementById("grid_22").className = "win_box";
    }
    if (win_colomn == 0) {
        document.getElementById("grid_00").className = "win_box";
        document.getElementById("grid_10").className = "win_box";
        document.getElementById("grid_20").className = "win_box";
    }
    if (win_colomn == 1) {
        document.getElementById("grid_01").className = "win_box";
        document.getElementById("grid_11").className = "win_box";
        document.getElementById("grid_21").className = "win_box";
    }
    if (win_colomn == 2) {
        document.getElementById("grid_02").className = "win_box";
        document.getElementById("grid_12").className = "win_box";
        document.getElementById("grid_22").className = "win_box";
    }
    
}


function pop_up_win() {

}


function clean_grid() {
    grid_arr = [[],[],[]];
    win_row = undefined ;
    win_colomn = undefined ;
    win_diagonal = undefined ;
    flag = false ;
    turn = "X";
    round_no = x_score + o_score + draw_score ;
    console.log(x_score , o_score , draw_score , round_no);
    update_scores();
    if (round_no == rounds) {
        if (x_score > o_score) {
            display_string = "X !!! Winner !!!    " + "X-Score : " + x_score + "      " + "O-Score : " + o_score + "        " + "Draws : " + draw_score ;
            //round_no = 0 ;
            alert(display_string);
            // To remove the turn indicator are end of round or game
            document.getElementById("x_score").innerHTML = "0";
            document.getElementById("o_score").innerHTML = "0";
            
            //reset_scores();
        }
        else if (x_score < o_score) {
            display_string = "O !!! Winner Winner Winner !!!    " + "X-Score : " + x_score + "      " + "O-Score : " + o_score + "        " + "Draws : " + draw_score;
            //round_no = 0 ;
            alert(display_string);
            // To remove the turn indicator are end of round or game
            document.getElementById("x_score").innerHTML = "0";
            document.getElementById("o_score").innerHTML = "0";
            //reset_scores();
        }
        else {
            display_string = "Draw !!!    " + "X-Score : " + x_score + "      " + "O-Score : " + o_score + "        " + "Draws : " + draw_score;
            //round_no = 0 ;
            alert(display_string);
            // To remove the turn indicator are end of round or game
            document.getElementById("x_score").innerHTML = "0";
            document.getElementById("o_score").innerHTML = "0";
            //reset_scores();
        }
        block_grid();
    }
    for (i=0; i<3;  i++) {
        for (j=0; j<3; j++) {
            grid_no = ("grid_" + String(i) + String(j)) ;
            document.getElementById(grid_no).className = "unchecked";
            document.getElementById(grid_no).innerHTML = null;
        }
    }
    // To remove turn indicator at the end of game and rounds
    document.getElementById("o_score_button").removeAttribute("style");
    document.getElementById("x_score_button").removeAttribute("style");

    
    
}