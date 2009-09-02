/*THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.*/
// taken from xinha editor optimized by tlissak 
// usage Event._addEvent(window,"load",myFunction) //:: IMPORTENT the function cennot use litteral or arguments "()"
var Event = new Object()
if(document.addEventListener){
	Event._addEvent =function(el,_eventType1,func){el.addEventListener(_eventType1,func,true);};
	Event._removeEvent =function(el,_eventType2,func){el.removeEventListener(_eventType2,func,true);	};
	Event._stopEvent =function(ev){	ev.preventDefault();	ev.stopPropagation();	};
}else if(document.attachEvent){
	Event._addEvent =function(el,_eventType3,func){	el.attachEvent("on"+_eventType3,func);};
	Event._removeEvent =function(el,_eventType4,func){	el.detachEvent("on"+_eventType4,func);	};
	Event._stopEvent =function(ev){	try{ ev.cancelBubble=true; ev.returnValue=false;}catch(ex){}};
}else{
	Event._addEvent =function(el,_eventType5,func){alert("_addEvent is not supported");};
	Event._removeEvent =function(el,_eventType6,func){	alert("_removeEvent is not supported");	};
	Event._stopEvent =function(ev){	alert("_stopEvent is not supported");};
}
Event.add = Event._addEvent
Event.stop = Event._stopEvent