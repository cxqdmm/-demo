/**
 * 冻结当前页面，使之不能上下滑动
 * 一般用于弹窗、引导层等场景
 */

let scrollTop = 0;
/**
 * 冻结页面
 */
function freezePage() {
    scrollTop = $(window).scrollTop();
    $('body').css({
        "position": "fixed",
        "top": -scrollTop + 'px',
        "min-height": "100%" //在iphone上无法撑高，必须给一个最小高度
    });
}

/**
 * 取消冻结
 */
function unFreezePage() {
    $('body').css({
        "position": "static"
    });
    window.scrollTo(0, scrollTop);
}

export {
    freezePage,
    unFreezePage
}