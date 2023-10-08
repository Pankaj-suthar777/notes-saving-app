let add = document.querySelector('.add');

let notes = JSON.parse(localStorage.getItem('notes'));

if(notes) {
   notes.forEach((note)=>{
      addNewNote(note);
   })
}

add.addEventListener('click',()=> {
   addNewNote();
})

function addNewNote( text ='') {
    let note = document.createElement('div');
    note.classList.add('note');

    note.innerHTML = `
     <div class="tools">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>

     </div>

     <div class="main ${text? '' : 'hidden'} "></div> 
     <textarea class=" ${text? 'hidden' : '' } "></textarea>
        `
        let delBtn = note.querySelector('.delete');
        let editBtn = note.querySelector('.edit');
        let main = note.querySelector('.main');
        let textArea = note.querySelector('textarea');
        delBtn.addEventListener('click', ()=> {
         note.remove();
         updateLS();
        })
        
         textArea.value = text;  //for testing not use now 
         main.innerHTML = text;  //for testing not use now


         editBtn.addEventListener('click',()=> {
         
         textArea.classList.toggle('hidden');
         main.classList.toggle('hidden');
         })

        textArea.addEventListener('input', (e)=> {
        let val = e.target.value;
        main.innerHTML = marked(val);

        updateLS();
        })

        let body = document.querySelector('body');
        body.appendChild(note);
}

function updateLS(){
   const notesText = document.querySelectorAll('textarea');
   const notes = [];
   notesText.forEach( note=>{
       notes.push(note.value);
   })

   localStorage.setItem('notes', JSON.stringify(notes));
}