let step = 1;
let questions = {
    1   :   {
        'speaking'  :  'alice',
        'answer_1'  :  'SYN : Can you hear me Bob?',
        'answer_2'  :  'FIN : Goodbye',
        'answer_3'  :  'ACK : Erm... What?',
        'answer'    :   1
    },
    2   :   {
        'speaking'  :  'bob',
        'answer_1'  :  'RST : Cya Later',
        'answer_2'  :  'PING : 77',
        'answer_3'  :  'SYN/ACK : Yes, I can hear you!',
        'answer'    :   3
    },
    3   :   {
        'speaking'  :  'alice',
        'answer_1'  :  'FAIL : SEGMENTATION FAULT',
        'answer_2'  :  'ACK : Okay Great',
        'answer_3'  :  'SYN : x = 3?',
        'answer'    :   2
    },
    4   :   {
        'speaking'  :  'alice',
        'answer_1'  :  'ICMP : 99',
        'answer_2'  :  'SYN : Yes, I can hear you!',
        'answer_3'  :  'DATA : Cheesecake is on sale!',
        'answer'    :   3
    },
    5   :   {
        'speaking'  :  'bob',
        'answer_1'  :  'ACK : I Hear ya!',
        'answer_2'  :  'REPEAT : What?',
        'answer_3'  :  'RESET : Help!',
        'answer'    :   1
    },
    6   :   {
        'speaking'  :  'alice',
        'answer_1'  :  'ACK : OK',
        'answer_2'  :  'FIN/ACK : I\'m all done',
        'answer_3'  :  'ECHO : Retry',
        'answer'    :   2
    },
    7   :   {
        'speaking'  :  'bob',
        'answer_1'  :  'SYN : Received',
        'answer_2'  :  'WIRE : Reset Connection',
        'answer_3'  :  'FIN/ACK : Yeah Me Too',
        'answer'    :   3
    },
    8   :   {
        'speaking'  :  'alice',
        'answer_1'  :  'SYN : Connected',
        'answer_2'  :  'ACK : Okay, Goodbye',
        'answer_3'  :  'SYN/ACK : Not Received',
        'answer'    :   2
    }
}
function answered(){
    if( this.id.substr(9,100) === questions[step].speaking ) {
        document.getElementsByClassName('error')[0].style.display='none';
        let answer_id = parseInt(this.id.replace('answer_', '').replace('_' + questions[step].speaking, ''));
        if (answer_id === questions[step].answer) {
            for(let i=1;i<4;i++) {
                document.getElementById('answer_' + i + '_' + questions[step].speaking).style.display = 'none';
            }
            document.getElementById('answer_' + answer_id + '_' + questions[step].speaking).style.display = 'block';
            document.getElementById('answer_' + answer_id + '_' + questions[step].speaking).style.backgroundColor = '#b3b3b3';
            document.getElementById(questions[step].speaking + '-bubble').style.opacity = '0.6';
            step++;
            if( step === 9 ) {
                document.getElementById( 'alice-bubble' ).style.opacity='0';
                document.getElementById( 'bob-bubble' ).style.opacity='0';
                document.getElementsByClassName('flag_inner')[0].innerHTML='Correct - You Win!';
                document.getElementsByClassName('flag')[0].style.display='block';
            }else {
                document.getElementById(questions[step].speaking + '-bubble').style.opacity = '1';
                for(let i=1;i<4;i++){
                    document.getElementById('answer_' + i + '_' + questions[step].speaking).style.backgroundColor = '#2a5a14';
                    document.getElementById('answer_' + i + '_' + questions[step].speaking).innerHTML = questions[step]['answer_' + i];
                    document.getElementById('answer_' + i + '_' + questions[step].speaking).style.display = 'block';
                }
            }
        } else {
            document.getElementsByClassName('error')[0].style.display='block';
        }
    }
}
for(let i=1;i<4;i++){
    document.getElementById('answer_' + i + '_' + questions[step].speaking ).innerHTML=questions[step]['answer_' + i];
    document.getElementById('answer_' + i + '_alice').addEventListener('click',answered);
    document.getElementById('answer_' + i + '_bob').addEventListener('click',answered);
}
setTimeout(function(){
    document.getElementById( questions[step].speaking + '-bubble' ).style.opacity='1';
},500);