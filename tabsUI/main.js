const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

//nếu dùng const $ = document.querySelector mà trỏ thẳng tới $('#heading') thì sẽ báo lỗi vì context this lúc này trỏ về global (đối tượng windows)
//bên trong querySelector dùng từ khóa this để trỏ về lại document thì mới
//áp dụng được document.querySelector('#heading')
//==> dùng bind(document) để đưa this từ windows về lại document

const tabs = $$('.tab-item')
const panes = $$('.tab-pane')
const tabActive = $('.tab-item.active')
const line = $('.tabs .line')
//console.log([tabActive]) để xem property offsetLeft, offsetWidth
line.style.left = tabActive.offsetLeft + 'px'
line.style.width = tabActive.offsetWidth + 'px'

tabs.forEach(function(tab, index) {
    const pane = panes[index]
    
    tab.onclick = function() {
        $('.tab-item.active').classList.remove('active')
        $('.tab-pane.active').classList.remove('active')

        line.style.left = this.offsetLeft + 'px'
        line.style.width = this.offsetWidth + 'px'

        this.classList.add('active')
        pane.classList.add('active')

    }
})