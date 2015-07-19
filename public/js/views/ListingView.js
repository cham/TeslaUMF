'use strict';

define([
    'lib/domNode',
    'hgn!templates/threadListing'
],
function(
    domNode,
    template
){

    function listenForClickEvents(view, eventBus){
        function clickListener(e){
            if(e.target.className === 'thread-urlname'){
                eventBus.emit('click:thread', e.target.innerHTML);
            }
        }

        view.el.addEventListener('click', clickListener);

        return clickListener;
    }

    function requiredOptions(options){
        if(!options.eventBus){
            throw new Error('ListingView requires eventBus');
        }
    }

    function ListingView(options){
        requiredOptions(options || {});

        this.el = domNode({ className: 'ListingView' });
        this.clickListener = listenForClickEvents(this, options.eventBus);
    }

    ListingView.prototype.render = function render(data){
        this.el.innerHTML = template(data);
    };

    ListingView.prototype.remove = function remove(){
        this.el.removeEventListener('click', this.clickListener);
        this.el.remove();
    };

    return ListingView;
    
});
