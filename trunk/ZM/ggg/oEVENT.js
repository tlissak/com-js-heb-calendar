/*
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.
*/

// Ev event hadneler object  taken from xinha editor
// modified by tlissak 
// usage Event._addEvent(window,"load",myFunction) 
// IMPORTENT the function cennot use litteral "()"
// i.e. Event._addEvent(document,"mousemove",myFunction())

var Event = new Object()
Event._eventFlushers=[];

Event.flushEvents=function(){
	var x=0; var e=Event._eventFlushers.pop(); 
	while(e){
		try{
			if(e.length==3){
				Event._removeEvent(e[0],e[1],e[2]); x++;
			}else{
				if(e.length==2){
					e[0]["on"+e[1]]=null;
					e[0]._Ev_dom0Events[e[1]]=null;
					x++;
				}
			}
		}catch(ex){}
		e=Event._eventFlushers.pop();
	}
};



	if(document.addEventListener){
		Event._addEvent=function(el,_eventType1,func){
		el.addEventListener(_eventType1,func,true);
		Event._eventFlushers.push([el,_eventType1,func]);
		};
		Event._removeEvent=function(el,_eventType2,func){
		el.removeEventListener(_eventType2,func,true);
		};
		Event._stopEvent=function(ev){
		ev.preventDefault();
		ev.stopPropagation();
		};
	}else{
			if(document.attachEvent){
				Event._addEvent=function(el,_eventType3,func){
					el.attachEvent("on"+_eventType3,func);
					Event._eventFlushers.push([el,_eventType3,func]);
				};
				Event._removeEvent=function(el,_eventType4,func){	el.detachEvent("on"+_eventType4,func);	};
				Event._stopEvent=function(ev){
					try{ 
						ev.cancelBubble=true; ev.returnValue=false;
					}catch(ex){}
				};
			}else{
				Event._addEvent=function(el,_eventType5,func){alert("_addEvent is not supported");};
				Event._removeEvent=function(el,_eventType6,func){	alert("_removeEvent is not supported");	};
				Event._stopEvent=function(ev){	alert("_stopEvent is not supported");};
			}
	}
	
	Event._addEvents=function(el,evs,func){
		for(var i=evs.length;--i>=0;){	Event._addEvent(el,evs[i],func);	}
	};
	Event._removeEvents=function(el,evs,func){
		for(var i=evs.length;--i>=0;){Event._removeEvent(el,evs[i],func);}
	};
	Event.addDom0Event=function(el,ev,fn){
		Event._prepareForDom0Events(el,ev);
		el._Ev_dom0Events[ev].unshift(fn);
	};
	Event.prependDom0Event=function(el,ev,fn){
		Event._prepareForDom0Events(el,ev);
		el._Ev_dom0Events[ev].push(fn);
	};
	
	Event._prepareForDom0Events=function(el,ev){
		if(typeof el._Ev_dom0Events=="undefined"){
			el._Ev_dom0Events={};
			Event.freeLater(el,"_Ev_dom0Events");
		}
		if(typeof el._Ev_dom0Events[ev]=="undefined"){
			el._Ev_dom0Events[ev]=[];
				if(typeof el["on"+ev]=="function"){
					el._Ev_dom0Events[ev].push(el["on"+ev]);
				}
			el["on"+ev]=function(_1c0){
			var a=el._Ev_dom0Events[ev];
			var _1c2=true;
				for(var i=a.length;--i>=0;){
					el._Ev_tempEventHandler=a[i];
					if(el._Ev_tempEventHandler(_1c0)===false){
						el._Ev_tempEventHandler=null;
						_1c2=false;
						break;
					}
				el._Ev_tempEventHandler=null;
				}
			return _1c2;
		};
	Event._eventFlushers.push([el,ev]);
	}
};
Event.add = Event._addEvent
Event.stop = Event._stopEvent