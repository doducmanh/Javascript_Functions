var courseAPI = 'http://localhost:3000/course'

function start() {
    getCourses(renderCourses)
    handleCreateForm()
}

// chạy trang web
start() 

// Functions
function getCourses(callback) {
    fetch(courseAPI)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
}

function renderCourses(courses) {
    var listCoursesBlock = document.querySelector('#list-course')
    var htmls = courses.map(function (course) {
        return `
            <li class="course-item-${course.id}">
                <h4>${course.name}</h4>
                <p>${course.description}</p>
                <button onclick="handleDeleteCourse(${course.id})">Xóa</button>       
            </li>
        `
    })
    listCoursesBlock.innerHTML = htmls.join('')
}
// Post course
function createCourse(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(data),
    }
    fetch(courseAPI, options) 
        .then(function (response) {
            return response.json()
        })
        .then(callback)
}
function handleCreateForm() {
    var createBtn = document.querySelector('#create')
    createBtn.onclick = function () {
        var name = document.querySelector('input[name="name"]').value
        var description = document.querySelector('input[name="description"]').value
        var formData = {
            name: name,
            description: description
        }
        createCourse(formData, function () {
            getCourses(renderCourses)
        })
    }
}

//Delete course
function handleDeleteCourse(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
    }
    fetch(courseAPI + '/' + id, options) // do muốn Delete phải truyền id vào sau url API sau dấu /
        .then(function (response) {
            return response.json()
        })
        .then(function() {
            var courseItem = document.querySelector('.course-item-' + id)
            if (courseItem) {
                courseItem.remove()
            }
        })
}
// Patch
function editCourse(idCourse, data, callback) {
    fetch(cousrseAPI + '/' + idCourse, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function handleEditCourse(idCourse) {
    var title = document.querySelector(`.course-title-${idCourse}`).innerText;
    var description = document.querySelector(`.course-desc-${idCourse}`).innerText;
    var titleInput = document.querySelector('#title');
    var descInput = document.querySelector('#description');

    titleInput.value = title;
    descInput.value = description;

    var createBtn = document.querySelector('#create-btn');
    createBtn.innerText = 'Edit';

    createBtn.onclick = function () {
        var data = {
            title: titleInput.value,
            desc: descInput.value,
        }
        editCourse(idCourse, data, function () {
            getCourses(renderCourse);
        })
        createBtn.innerText = 'Create';
        titleInput.value = '';
        descInput.value = '';
    }
}
