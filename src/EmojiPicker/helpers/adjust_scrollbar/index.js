export default function adjustScrollbar(scrollHeight, scrollTop, listHeight, _scroller) {
    const wholeRange = (scrollHeight),
        visibleRange = (listHeight - 15),
        newPos = ((scrollTop) * visibleRange) / wholeRange;

    _scroller.setAttribute('style', `transform: translateY(${newPos}px)`);
}