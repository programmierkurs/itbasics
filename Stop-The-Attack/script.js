
function dec2hex(i) {
    return (i+0x10000).toString(16).substr(-2).toUpperCase();
}

var colour = 0;
var colourChange;
var attack_packets;
var attack_packets2;
var attack_packets3;
var attack_packets4;
var website_down = false;
var packets = [];
var packet_count = 0;

var battery_level = 1;


var block_hacker = false;
var block_visitor = false;

function batteryGauge(){

    if( battery_level === 3 ){
        if( block_hacker ){
            document.getElementsByClassName('battery_gauge')[0].style.animationPlayState = "paused";
            document.getElementsByClassName('block_2')[0].style.display = 'none';
            battery_level = 2;
        }else {
            document.getElementsByClassName('battery_gauge')[0].style.animationDuration = '500ms';
            document.getElementsByClassName('block_1')[0].style.display = 'block';
        }
    }else if( battery_level === 2 ){
        if( block_hacker ){
            document.getElementsByClassName('battery_gauge')[0].style.animationPlayState = "paused";
            document.getElementsByClassName('block_3')[0].style.display = 'none';
            battery_level = 1;
        }else {
            document.getElementsByClassName('battery_gauge')[0].style.animationPlayState = "running";
            document.getElementsByClassName('block_2')[0].style.display = 'block';
            battery_level = 3;
        }
    }else if( battery_level === 1 ){
        if( block_hacker ) {
            document.getElementsByClassName('block_3')[0].style.display = 'none';
        }else{
            document.getElementsByClassName('block_3')[0].style.display='block';
            battery_level = 2;
        }
    }
}


function begin(){
    document.getElementsByClassName('serverdown')[0].style.display='none';
    document.getElementsByClassName('battery_gauge')[0].style.animationPlayState = "paused";
    document.getElementsByClassName('block_1')[0].style.display = 'none';
    document.getElementsByClassName('block_2')[0].style.display = 'none';
    document.getElementsByClassName('block_3')[0].style.display = 'none';
    battery_level = 1;
    block_hacker = false;
    block_visitor = false;
    website_down = false;
    document.getElementsByClassName('firewall')[0].innerHTML='<tr><th>Source IP</th><th>Destination IP</th><th>Port</th><th>Action</th></tr>';
    document.getElementsByClassName('bsod')[0].style.backgroundColor='#000000';
    document.getElementsByClassName('bsod')[0].style.backgroundImage='';



    setTimeout(batteryGauge,5000);
    setTimeout(batteryGauge,10000);
    setTimeout(batteryGauge,15000);

    setTimeout(function(){
        website_down = true;
        clearInterval(attack_packets);
        clearInterval(attack_packets2);
        clearInterval(attack_packets3);
        clearInterval(attack_packets4);
        if( block_hacker ) {
            document.getElementsByClassName('battery_gauge')[0].style.animationPlayState = "paused";
            setTimeout(function(){
                document.getElementsByClassName('block_1')[0].style.display = 'none';
            },300);
            setTimeout(function(){
                document.getElementsByClassName('block_2')[0].style.display = 'none';
            },600);
            setTimeout(function(){
                document.getElementsByClassName('block_3')[0].style.display = 'none';
                if( block_visitor ){
                    setTimeout(function(){
                        document.getElementsByClassName('serverdown')[0].style.display='block';
                        document.getElementsByClassName('serverdown')[0].getElementsByTagName('p')[0].innerHTML='Oh no! You blocked the hacker but you also blocked the visitor as well!';
                        document.getElementsByClassName('overlay')[0].style.display='block';
                    },1000);
                }else{
                    setTimeout(function(){
                        document.getElementsByClassName('serverup')[0].style.display='block';
                        document.getElementsByClassName('serverup')[0].getElementsByTagName('p')[1].innerHTML='<strong>THM{FIREWALLS_RULE}</strong>';
                        document.getElementsByClassName('overlay')[0].style.display='block';
                    },1000)
                }
            },900);
        }else{
            document.getElementsByClassName('bsod')[0].style.backgroundImage='url("bsod.png")';
            setTimeout(function(){
                document.getElementsByClassName('serverdown')[0].style.display='block';
                document.getElementsByClassName('serverdown')[0].getElementsByTagName('p')[0].innerHTML='Oh no! The server went down, try again!';
                document.getElementsByClassName('overlay')[0].style.display='block';
            },1000)
        }
    },20000);

    attack_packets = setInterval(function(){
        sendPacket(false);
    },1000);

    attack_packets4 = setInterval(function(){
        sendPacket(true);
    },2333);

    setTimeout(function(){
        attack_packets2 = setInterval(function(){
            sendPacket(false);
        },500);
    },5000);

    setTimeout(function(){
        attack_packets3 = setInterval(function(){
            sendPacket(false);
        },250);
    },10000);

}

function startSim(){
    document.getElementsByClassName('welcome')[0].style.display='none';
    document.getElementsByClassName('overlay')[0].style.display='none';
    begin();
}

document.getElementsByClassName('startsim')[0].addEventListener('click',startSim);
document.getElementsByClassName('startsim')[1].addEventListener('click',startSim);

function sendPacket(friendly){
    let c =  packet_count;
    packet_count++;
    packets.push(document.createElement('DIV'));
    packets[c].classList.add('packet');
    packets[c].style.marginLeft='90px';
    if( friendly ){
        packets[c].classList.add('packet-friendly');
        packets[c].style.marginTop='237px';
    }else{
        packets[c].style.marginTop='27px';
    }
    if( website_down ){
        packets[c].style.display='none';
    }
    packets[c].packet_data = {
        id    : c,
        from  : ( ( friendly ) ? 'visitor' : 'hacker' ),
        stage : 0,
        hop   : 0
    }
    packets[c].addEventListener('transitionend',function(){
        if( this.packet_data.stage === 2 ){
            this.remove();
        }
        if( this.packet_data.stage === 1 ){
            this.style.opacity='0';
            this.packet_data.stage = 2;
        }
        if( this.packet_data.stage === 0 ){
            if( this.packet_data.hop === 1 ){
                if( this.packet_data.from === 'hacker' ){
                    if( block_hacker ){
                        this.style.opacity='0';
                        this.packet_data.stage = 2;
                    }else{
                        this.style.marginLeft = '540px';
                        this.packet_data.stage = 1;
                        this.packet_data.hop = 0;
                    }
                }else{
                    if( block_visitor ){
                        this.style.opacity='0';
                        this.packet_data.stage = 2;
                    }else{
                        this.style.marginLeft = '540px';
                        this.packet_data.stage = 1;
                        this.packet_data.hop = 0;
                    }
                }
            }else{
                this.packet_data.hop = 1;
            }
        }
    });
    document.getElementsByClassName('network-box')[0].appendChild(packets[c]);
    setTimeout(function(p){
        p.style.marginLeft='235px';
        p.style.marginTop='150px';
    },100,packets[c]);
}



document.getElementById('patch').addEventListener('click',function(){
    let src = document.getElementById('firewall_src').value;
    let dst = document.getElementById('firewall_dst').value;
    let port = document.getElementById('firewall_port').value;
    let action = document.getElementById('firewall_action').value;
    let row = document.createElement('TR');
    row.innerHTML = '<td>' + src + '</td><td>' + dst + '</td><td>' + port + '</td><td>' + action + '</td>';
    document.getElementsByClassName('firewall')[0].appendChild(row);
    if( src === '198.51.100.34' && dst === '203.0.110.1' && port === '80' && action === 'DROP' ){
        document.getElementsByClassName('bsod')[0].style.backgroundColor='#000000';
        block_hacker = true;
    }
    if( src === '203.0.113.99' && dst === '203.0.110.1' && port === '80' && action === 'DROP' ){
        block_visitor = true;
    }
});