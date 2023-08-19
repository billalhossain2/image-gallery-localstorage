const imgInputField = document.getElementById("image-input-field");
const uploadBtn = document.getElementById("upload-btn");
const removeBtn = document.getElementById("remove-btn");
const gallery = document.getElementById("gallery");

function showImg(){
    for(let i = 0; i < localStorage.length; i++){
        let name = localStorage.key(i)
        const img = new Image();
        img.src = localStorage.getItem(name)
        gallery.appendChild(img)
    }
}

uploadBtn.addEventListener('click', (ev)=>{
    ev.preventDefault()
    const file = imgInputField.files[0];
    if(!file){
        return alert('Please choose file first')
    }
    gallery.innerHTML = "";
    const fileName = imgInputField.files[0].name;

    //read file
    const reader = new FileReader();

    reader.readAsDataURL(file)

    reader.addEventListener('load', function(ev){
        console.log(this)
        if(this.result){
            const result = this.result;
            localStorage.setItem(fileName, result)
            if(localStorage.length > 0){
                removeBtn.style.display = "block"
            }
            showImg()
        }else{
            console.log("File not found!")
        }
    })
    console.log('showImg')
})

function removeAll(){
    const isRemove = confirm("Are you sure to remove all ?");
    if(!isRemove){
        return;
    }
    localStorage.clear();
    gallery.innerHTML = "";
    removeBtn.style.display = "none";
}

showImg()