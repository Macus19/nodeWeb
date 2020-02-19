var fs = require('fs')
var path = require('path')
var args = process.argv.splice(2) // 去掉“node click.js”,只留下参数
var command = args.shift() // 取出第一个命令
var taskDescription = args.join('') // 合并剩余的参数
var file = path.join(process.cwd(),'/.task') // 根据当前的工作目录解析数据库的相对路径

// 确定cli脚本应该采用什么动作
switch(command){
    case 'list': // 列出所有保存的任务
        listTasks(file)
        break
    case 'add': // 添加新项目
        addTask(file, taskDescription) 
        break
    default: // 其余任何参数都显示帮助
        console.log('Usage: '+process.argv[0]+' list|add [taskDescription]')

}

// 从文本文件中加载用JSON编码的数据
function loadOrInitializeTaskArray(file, cb){
    fs.exists(file, function(exists){ // 检查.tasks文件是否已经存在
        var tasks = []
        if(exists){
            fs.readFile(file,'utf8',function(err,data){ // 从.tasks文件中读取待办事项数据
                if(err) throw err
                var data = data.toString()
                var tasks = JSON.parse(data||'[]') // 用JSON编码的待办事项数据解析到任务数组中
                cb(tasks)
            })
        }else{
            cb([]) // 如果.tasks文件不存在，则创建新的空的任务数组
        }
    })
}

// 列出任务的函数
function listTasks(file){
    loadOrInitializeTaskArray(file,function(tasks){
        for(var i in tasks){
            console.log(tasks[i])
        }
    })
}

// 把任务保存到磁盘中
function storeTasks(file, tasks){
    fs.writeFile(file, JSON.stringify(tasks),'utf8',function(err){
        if(err) throw err
        console.log('Saved.')
    })
}

// 添加一项任务
function addTask(file,taskDescription){
    loadOrInitializeTaskArray(file,function(tasks){
        tasks.push(taskDescription)
        storeTasks(file,tasks)
    })
}