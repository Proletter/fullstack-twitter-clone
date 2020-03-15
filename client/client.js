const $ = id => document.querySelector(id)
const loading = $('.loading')
loading.style.display = 'none';

const API_URL = 'http://localhost:1337/mews'
const GET_URL = 'http://localhost:1337'
const mewELem = $('.mews')

listItems()

const forms = $('form')
const postMew = (e) => {
    loading.style.display = '';
    e.preventDefault()
    const formData = new FormData(forms)
    const name = formData.get('name')
    const content = formData.get('content')
    console.log('submitted')

    const mew = {
        name,
        content
    }
    console.log(mew)
    $('.input').value = ''
    $('.text').value = ''
    forms.style.display = 'none'
    loading.style.display = ''

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(mew),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
        .then(createdMew => {
            console.log(createdMew)
            forms.style.display = ''
            loading.style.display = 'none'
            listItems()
        }       
    )

}


const form = $('form').addEventListener('submit', postMew)
function listItems() {
mewELem.innerHTML = ''
fetch(GET_URL).
        then(res => res.json())
    .then(mews => {
        mews.forEach(mew => {
            const div = document.createElement('div')
            const header = document.createElement('h3')
            header.textContent = mew.name
            const contents = document.createElement('p')
            contents.textContent = mew.content
            div.appendChild(header)
            div.appendChild(contents)
            mewELem.appendChild(div)
            

        })
    })
}
    



