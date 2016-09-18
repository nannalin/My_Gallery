var source;

/**
 * This function returns true if a dragged element
 * is placed at the location before its orginal location,
 * otherwise returns false.
 */
function isBefore(a, b) {
    if (a.parentNode == b.parentNode) {       
        for (var cur = a; cur; cur = cur.previousSibling) {
            if (cur === b) { 
                return true;
            }
        }
    }
    return false;
}

/**
 * dragenter event is fired when a dragged element enters a valid drop target.
 * event target is the element underneath the element being dragged.
 */
function dragenter(e) {
    if (isBefore(source, e.target)) {
        e.target.parentNode.insertBefore(source, e.target);
    }
    else {
        e.target.parentNode.insertBefore(source, e.target.nextSibling);
    }
}

/**
 * dragstart event is fired when an element is dragged.
 * event target is the element that will be dragged.
 */
function dragstart(e) {
    source = e.target;
    /** Specifies the effect that is allowed for a drag operation
     * The move operation indicates that a dragged element 
     * may be moved to a new location.
     */
    e.dataTransfer.effectAllowed = 'move';
}