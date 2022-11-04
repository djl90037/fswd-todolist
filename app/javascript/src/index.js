import $ from 'jquery'

import {
  deleteTask,
  indexTasks,
  postTask,
  markTaskComplete,
  markTaskActive,
} from "./requests.js";


indexTasks(function (response) {
  var htmlString = response.tasks.map(function (task) {
    return "<div id='task' class='d-flex col-12 mb-3 p-2 border rounded task justify-content-between " + (task.completed ? "checked'" : "'") + "data-id='" + task.id + "'>" + "<input id='checkbox' type='checkbox' class='mark-complete mr-2' data-id='" + task.id + "'" + (task.completed ? "checked" : "") + ">"
      + "<p class='d-inline px-2 my-2 text-wrap task-content'>" + task.content + "</p>" + "<button class='delete float-right btn-outline-danger btn-sm' data-id='" + task.id + "'>Delete</button>" +
      "</div>";
  })

  $('#tasks').html(htmlString);
})

var displayAllTasks = function (response) {
  var htmlString = response.tasks.map(function (task) {
    return "<div id='task' class='d-flex col-12 mb-3 p-2 border rounded task justify-content-between " + (task.completed ? "checked'" : "'") + "data-id='" + task.id + "'>" + "<input id='checkbox' type='checkbox' class='mark-complete mr-2' data-id='" + task.id + "'" + (task.completed ? "checked" : "") + ">"
      + "<p class='d-inline px-2 my-2 text-wrap task-content'>" + task.content + "</p>" + "<button class='delete float-right btn-outline-danger btn-sm' data-id='" + task.id + "'>Delete</button>" +
      "</div>";
  })

  $('#tasks').html(htmlString);
}

$(document).on('click', '.addTask', function (event) {
  event.preventDefault();

  var input = $('#task-input').val();
  postTask(input);
  indexTasks(displayAllTasks);
  $('#task-input').val('')
})

$(document).on('click', '.delete', function () {
  deleteTask($(this).data('id'), setTimeout(function () { indexTasks(displayAllTasks); }, 100));
});

$(document).on('click', '.mark-complete', function () {
  if (this.checked) {
    markTaskComplete($(this).data('id'), function () {
      indexTasks(displayAllTasks);
    });
    // $(this).addClass('checked')
  } else {
    markTaskActive($(this).data('id'), function () {
      indexTasks(displayAllTasks);
    });
    // $(this).removeClass('checked')
  }
  indexTasks(displayAllTasks)
})

