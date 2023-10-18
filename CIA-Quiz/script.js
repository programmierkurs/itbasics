let questions = function(){
    let flag_str = '';
    let level = 1;
    let qs = [];
    let question_box = document.getElementById('question_box');
    let answer_a = document.getElementById('answer_a');
    let answer_b = document.getElementById('answer_b');
    let answer_c = document.getElementById('answer_c');
    let title_str = '';
    let wrong = 0;
    let doQuestion = function(){
        document.getElementsByTagName('H2')[0].innerHTML='Question ' + level + '/' + qs.length;
        let cq = (level-1);
        question_box.innerHTML = '<div style="font-size: ' + qs[ cq ].fontsize + '">' + qs[ cq ].question + '</div>';
        answer_a.innerHTML = '<div class="first_letter flone">' + qs[ cq ].answer_a.charAt(0)  + '</div><div class="the_answer">' + qs[ cq ].answer_a + '</div><div class="first_letter fltwo">' + qs[ cq ].answer_a.charAt(0)  + '</div>';
        answer_b.innerHTML = '<div class="first_letter flone">' + qs[ cq ].answer_b.charAt(0)  + '</div><div class="the_answer">' + qs[ cq ].answer_b + '</div><div class="first_letter fltwo">' + qs[ cq ].answer_b.charAt(0)  + '</div>';
        answer_c.innerHTML = '<div class="first_letter flone">' + qs[ cq ].answer_c.charAt(0)  + '</div><div class="the_answer">' + qs[ cq ].answer_c + '</div><div class="first_letter fltwo">' + qs[ cq ].answer_c.charAt(0)  + '</div>';
        answer_a.style.border='6px solid #FFF';
        answer_b.style.border='6px solid #FFF';
        answer_c.style.border='6px solid #FFF';
    }
    let answerIt = function(e){
        let cq = (level-1);
        let user_answer = e.target.parentElement.id.replace('answer_','').toLowerCase();
        let the_answer = qs[ cq ].answer.toLowerCase();
        if( user_answer === the_answer ){
            if( level === qs.length ){
                document.getElementById('flag_modal').style.display='block';
                document.getElementById('flag').innerHTML= flag_str;
            }else {
                wrong = 0;
                level++;
                doQuestion();
            }
        }else{
            wrong++;
            e.target.parentElement.style.border='6px solid #F00';
            if( wrong === 2 ){
                level = 1;
                wrong = 0;
                setTimeout(doQuestion,500);
            }
        }
    }
    return {
        'addQuestion'   :   function(q,a1,a2,a3,a,fontSize){
            qs.push({
                'question'  :   q,
                'answer_a'  :   a1,
                'answer_b'  :   a2,
                'answer_c'  :   a3,
                'answer'    :   a,
                'fontsize' :   fontSize
            });
        },
        'setup'  :   function(){
            document.getElementsByTagName('H1')[0].innerHTML=title_str;
            answer_a.addEventListener('click',answerIt);
            answer_b.addEventListener('click',answerIt);
            answer_c.addEventListener('click',answerIt);
            doQuestion();
        },
        'flag'  :   function(str){
            flag_str = atob(atob(str));
        },
        'title'  :   function(str){
            title_str = str;
        }
    }
}

let qs = new questions();
qs.addQuestion('As the troops got deployed, the leader stressed that they should not communicate their location to anyone while the mission was ongoing. Which security function did the leader want to have?','Confidentiality','Integrity','Availability','a','24px');
qs.addQuestion('One hotel is stressing that the Internet over its WiFi network must be accessible 24 hours a day, seven days a week. Which security pillar is the hotel requiring?','Confidentiality','Integrity','Availability','c','24px');
qs.addQuestion('At a police checkpoint, the police officer suspected that the vehicle registration papers were fake. Which security function does the officer think is lacking?','Confidentiality','Integrity','Availability','b','24px');
qs.addQuestion('Two companies are negotiating a certain agreement; however, they want to keep the details of the agreement secret. Which security pillar are they emphasizing?','Confidentiality','Integrity','Availability','a','24px');
qs.addQuestion('You went to cash out a cheque, and the bank teller made you wait for five minutes as they confirmed the signature of the cheque\'s issuer. Which security function is the bank teller checking?','Confidentiality','Integrity','Availability','b','24px');
qs.flag('VkVoTmUwTkpRVjlVVWtsQlJIMD0=');
qs.title('Security Principles')
qs.setup();
