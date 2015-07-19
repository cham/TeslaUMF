'use strict';

define([
    'lib/domNode',
    'lib/requiredOptions',
    'hgn!templates/thread'
],
function(
    domNode,
    requiredOptions,
    template
){

    function listenForClickEvents(el, eventBus){
        function clickListener(e){

        }

        el.addEventListener('click', clickListener);

        return clickListener;
    }

    function ThreadView(options){
        requiredOptions(options || {}, 'ThreadView', [
            'eventBus'
        ]);

        this.el = domNode({
            className: 'ThreadView'
        });

        this.clickListener = listenForClickEvents(this.el, options.eventBus);
    }

    ThreadView.prototype.render = function render(data){
        this.el.innerHTML = template(data);
    };

    ThreadView.prototype.remove = function remove(){
        this.el.removeEventListener('click', this.clickListener);
        this.el.remove();
    };

    return ThreadView;
    
});
