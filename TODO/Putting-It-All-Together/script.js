sortIt = function(data){
    data = {
        raw       :   data,
        object    :   JSON.parse(atob(data))
    }
    let store = {
        valid_drop          :   false,
        drag_container      :   null,
        current_drag        :   null
    }
    let methods = {
        drag : function(ev){
            store.drag_container = ev.srcElement.parentElement;
            ev.dataTransfer.setData("text", ev.target.id);
            store.current_drag = document.getElementById( ev.srcElement.id );
        },
        dragFinished  :   function(ev){
            if( store.valid_drop ) {
                ev.remove();
                if (store.drag_container.attributes['data-type'].nodeValue === 'box') {
                    store.drag_container.innerHTML = '<span>' + store.drag_container.attributes['data-id'].nodeValue + '</span>';
                }
            }
            store.drag_container=null;
            store.valid_drop=false;

            this.checkAnswers();

        },
        returnStyle   :   function(){
            let answers = document.getElementById('answers').getElementsByTagName('DIV');
            for(let i=0;i<answers.length;i++){
                answers[i].style.border='3px dashed #878787';
            }
            document.getElementById('container').style.borderRight='3px dashed #878787';
        },
        checkAnswers    :   function(){
            let ans = data.object;
            let score = 0;
            let answered = 0;
            let answers = document.getElementById('answers').getElementsByTagName('DIV');
            for(let i=0;i<data.questions;i++){
                let answer = answers[i].getElementsByTagName('IMG');
                let question_id = parseInt( answers[i].attributes['data-id'].nodeValue );
                answers[i].style.border='3px dashed #878787';
                console.log('Answer: ' + i );
                console.log(answer);
                console.log( 'Length: ' + answer.length );
                console.log( answer[0] )

                if( answer.length === 1 ){


                    let h = i+1;
                    answered++;
                    let answer_id = parseInt(answer[0].attributes['id'].nodeValue.replace('drag',''));
                    if( question_id === h && answer_id === ans[h] ){
                        score++;
                        answers[i].style.border='3px dashed #4cdb37';
                    }else{
                        answers[i].style.border='3px dashed #F00';
                    }
                }
            }
            if( score === answers.length ){
                alert('You did it! ' + ans.flag );
            }else{
                if( answered === answers.length ){
                    alert('Sorry, you got it in the wrong order')
                }
            }
        },
        backToContainer :   function(ev){
            ev.preventDefault();
            if (store.drag_container.attributes['data-type'].nodeValue === 'container') {
                store.valid_drop = false;
            }else{
                store.valid_drop = true;
                let box_id = parseInt( store.current_drag.id.replace('drag','') );
                document.getElementById('container').appendChild(buildImg(box_id));
            }
        },
        drop : function(ev) {
            ev.preventDefault();
            if( ev.target.nodeName !== 'IMG' ) {
                store.valid_drop = true;
                let box_id = parseInt(store.current_drag.id.replace('drag',''));
                if (ev.target.nodeName === 'SPAN') {
                    let par = ev.target.parentElement;
                    ev.target.parentElement.innerHTML = '';
                    par.appendChild( buildImg(box_id) );
                } else {
                    ev.target.innerHTML = '';
                    ev.target.appendChild(buildImg(box_id));
                }
            }
            this.returnStyle();
        },
        allowDropContainer : function(ev) {
            ev.preventDefault();
            if( ev.target.nodeName === 'DIV' ){
                ev.target.style.borderRight='3px dashed #000';
            }else{
                ev.target.parentElement.style.borderRight='3px dashed #000';
            }
        },
        allowDrop : function(ev) {
            ev.preventDefault();
            if( ev.target.nodeName === 'DIV' ) {
                ev.target.style.border = '3px dashed #000';
            }else if( ev.target.nodeName === 'IMG' ){
                ev.target.parentElement.style.border = '3px dashed #F00';
            }else{
                ev.target.parentElement.style.border='3px dashed #000';
            }
        },
        resizeURL   :   function(){
            document.getElementById('answers').style.width = ( window.innerWidth -370 ) + 'px';
        }
    }

    let buildImg = function(i){
        let img = document.createElement('img');
        img.id = 'drag' + i;
        img.src = i + '.png';
        img.draggable = true;
        img.width = 150;
        img.height = 150;
        img.addEventListener('dragstart', function(){ methods.drag(event) });
        img.addEventListener('dragend', function () { methods.dragFinished(this); });
        return img;
    }

    let buildDropbox = function(i){
        let dropbox = document.createElement('div');
        dropbox.setAttribute('data-id', '' + i );
        dropbox.setAttribute('data-type', 'box' );
        dropbox.addEventListener('drop',function(){ methods.drop(event) });
        dropbox.addEventListener('dragover',function(){ methods.allowDrop(event) });
        dropbox.addEventListener('dragleave',function(){ methods.returnStyle() });
        dropbox.innerHTML='<span>' + i + '</span>';
        dropbox.classList.add('dropbox');
        return dropbox;
    }

    let setup = function(){
        if( data.object.hasOwnProperty('flag') ){
            let all_items = true;
            let items = Object.values(data.object);
            for( let i=1;i<items.length;i++){
                if( !data.object.hasOwnProperty(i) ){
                    all_items = false;
                }
            }
            if( !all_items ){
                alert('Missing Answers');
            }else{
                data.questions = (items.length-1);
                data.flag = data.object.flag;
                document.getElementById('container').addEventListener('dragover',function(){methods.allowDropContainer(event)})
                document.getElementById('container').addEventListener('drop',function(){methods.backToContainer(event)})
                for(let i=1;i<items.length;i++){
                    document.getElementById('container').appendChild( buildImg(i) );
                    document.getElementById('answers').appendChild( buildDropbox(i) );
                }
            }
        }else{
            alert('Setup error, not flag in data');
        }
    }
    setup();
    window.onresize = methods.resizeURL;
    methods.resizeURL();
}


