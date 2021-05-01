function getTeacherData () {
    fetch ('./api/Grades.json')
    .then(response => {
        return response.json();
    })
    .then(data => getGroups(data))
 
}

function getGroups(data) {
    let groupList = new Map();
    Object.values(data).forEach(value => {
        let counter = groupList.get(value.groupsub_key) || {};
        if (Object.entries(counter).length === 0) {
            groupList.set(value.groupsub_key, {
                "group": value.group,
                "subject": value.subject,
                "students": 1
            }) 
        } else {
            groupList.set(value.groupsub_key, {
                "group": value.group,
                "subject": value.subject,
                "students": counter.students + 1
            })
        }
    })
    console.log(groupList)

    let groupsTable = document.getElementById('groups_table');

    groupList.forEach( (value, key) => {
        let groupMarkup = `
            <td>${value.group}</td>
            <td>${value.subject}</td>
            <td>${value.students}</td>
            <td>
                <img class="action_icon" src="./assets/edit.svg" alt="Edit icon">
                <img class="action_icon" src="./assets/delete.svg" alt="Delete icon">
            </td>
        `
        
        let group = document.createElement('tr')
        group.setAttribute('id', key)
        group.innerHTML += groupMarkup;
        groupsTable.appendChild(group)
    }) 
}

getTeacherData();