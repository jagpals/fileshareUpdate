const dropZone = document.querySelector(".drop-zone");
const browsebtn  = document.querySelector(".browsebtn");
const fileinput = document.querySelector("#fileinput");
const emailForm = document.querySelector("#emailForm")

const toast = document.querySelector(".toast");

 const bgProgress = document.querySelector(".bg-progress");
const progressPercent = document.querySelector("#progressPercent");
const progressContainer = document.querySelector(".progress-container");
const progressBar = document.querySelector(".progress-bar");
const status = document.querySelector(".title");


const fileURLInput = document.querySelector("#fileURL");
const sharingContainer=document.querySelector(".sharing-container");

const copyBtn = document.querySelector("#copyBtn");

 const host = "http://sharefile-s.herokuapp.com"
//const host="http://localhost:3000"

const uploadURL = `${host}/api/files/`;
const emailURL = `${host}/api/files/send/`;

dropZone.addEventListener("dragover",(e)=>{
    e.preventDefault();
    if(!dropZone.classList.contains("dragged"))
    {   
        dropZone.classList.toggle("dragged");
    } 
});

dropZone.addEventListener("dragleave",(e)=>{
    e.preventDefault();
    dropZone.classList.remove("dragged");
});

dropZone.addEventListener("drop",(e)=>{
    e.preventDefault();
    dropZone.classList.remove("dragged");
    //console.log(e.dataTransfer.files.length);
    const files = e.dataTransfer.files
    //console.log(files);
   // console.log(files.length);
    if(files.length){
     
        fileinput.files=files;
        uploadFile();
    }
});

fileinput.addEventListener("change",()=>{
    uploadFile();
});
browsebtn.addEventListener('click',()=>{
    fileinput.click()
});
copyBtn.addEventListener('click',()=>{
    fileURLInput.select();
    document.execCommand("copy");
    showToast('Link copied Successfully!')
})


const uploadFile = ()=>{
    progressContainer.style.display='block';
    const file = fileinput.files[0]
    const formData = new FormData()
    formData.append("myfile",file);
  
    const xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = ()=>
    {
        if(xhr.readyState === XMLHttpRequest.DONE)
        {
           // console.log('JAI MATA DI');
            //console.log(xhr.response);
            onUploadSuccess(JSON.parse(xhr.response));
        }
    
    };
    
      xhr.upload.onprogress = updateProgress;
    
    xhr.open('post',uploadURL,true);
  //  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     xhr.send(formData);
  
};

const updateProgress = (e) =>{
    const percent = Math.round((e.loaded/e.total)*100);
    console.log(percent);
    bgProgress.style.width = `${percent}%`;
    progressPercent.innerText=percent;
    console.log(`scaleX(${percent/100})`);
    progressBar.style.transform=`scaleX(${percent/100})`;
}

const onUploadSuccess=({file:url})=>{
    emailForm[2].removeAttribute("disabled");
    fileinput.value="";
//console.log(url);
fileURLInput.value=url;
progressContainer.style.display="none";
sharingContainer.style.display="block";
}

emailForm.addEventListener('submit',(e)=>{
    e.preventDefault();

     const url = fileURLInput.value;
    const formData = {
        uuid:url.split("/").splice(-1,1)[0],
        emailTo:emailForm.elements["from-email"].value,
        emailFrom:emailForm.elements["to-email"].value
    };

    console.table(formData);

    emailForm[2].setAttribute("disabled","true");

    fetch(emailURL,{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(formData)
    }).then(res=>res.json())
    .then((success)=>{
        if(success)
        {
            sharingContainer.style.display="none";
            showToast("Email sent Successfully")
        }
    })
});

let toastTimer;
// the toast function
const showToast = (msg) => {
    console.log('chl');
  clearTimeout(toastTimer);
  toast.innerText = msg;
  toast.classList.add("show");
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
    console.log('chl rha hoo');
  }, 2000);
};
  
// const dropZone = document.querySelector(".drop-zone");
// const fileInput = document.querySelector("#fileInput");
// const browseBtn = document.querySelector("#browsebBtn");

// const bgProgress = document.querySelector(".bg-progress");
// const progressPercent = document.querySelector("#progressPercent");
// const progressContainer = document.querySelector(".progress-container");
// const progressBar = document.querySelector(".progress-bar");
// const status = document.querySelector(".status");

// const sharingContainer = document.querySelector(".sharing-container");
// const copyURLBtn = document.querySelector("#copyURLBtn");
// const fileURL = document.querySelector("#fileURL");
// const emailForm = document.querySelector("#emailForm");

// const toast = document.querySelector(".toast");

// const baseURL = "https://innshare.herokuapp.com";
// const uploadURL = `${baseURL}/api/files`;
// const emailURL = `${baseURL}/api/files/send`;

// const maxAllowedSize = 100 * 1024 * 1024; //100mb


// browseBtn.addEventListener("click", () => {
//   fileInput.click();
// });

// dropZone.addEventListener("drop", (e) => {
//   e.preventDefault();
//   //   console.log("dropped", e.dataTransfer.files[0].name);
//   const files = e.dataTransfer.files;
//   if (files.length === 1) {
//     if (files[0].size < maxAllowedSize) {
//       fileInput.files = files;
//       uploadFile();
//     } else {
//       showToast("Max file size is 100MB");
//     }
//   } else if (files.length > 1) {
//     showToast("You can't upload multiple files");
//   }
//   dropZone.classList.remove("dragged");
// });

// dropZone.addEventListener("dragover", (e) => {
//   e.preventDefault();
//   dropZone.classList.add("dragged");

//   // console.log("dropping file");
// });

// dropZone.addEventListener("dragleave", (e) => {
//   dropZone.classList.remove("dragged");

//   console.log("drag ended");
// });

// // file input change and uploader
// fileInput.addEventListener("change", () => {
//   if (fileInput.files[0].size > maxAllowedSize) {
//     showToast("Max file size is 100MB");
//     fileInput.value = ""; // reset the input
//     return;
//   }
//   uploadFile();
// });

// // sharing container listenrs
// copyURLBtn.addEventListener("click", () => {
//   fileURL.select();
//   document.execCommand("copy");
//   showToast("Copied to clipboard");
// });

// fileURL.addEventListener("click", () => {
//   fileURL.select();
// });

// const uploadFile = () => {
//   console.log("file added uploading");

//   files = fileInput.files;
//   const formData = new FormData();
//   formData.append("myfile", files[0]);

//   //show the uploader
//   progressContainer.style.display = "block";

//   // upload file
//   const xhr = new XMLHttpRequest();

//   // listen for upload progress
//   xhr.upload.onprogress = function (event) {
//     // find the percentage of uploaded
//     let percent = Math.round((100 * event.loaded) / event.total);
//     progressPercent.innerText = percent;
//     const scaleX = `scaleX(${percent / 100})`;
//     bgProgress.style.transform = scaleX;
//     progressBar.style.transform = scaleX;
//   };

//   // handle error
//   xhr.upload.onerror = function () {
//     showToast(`Error in upload: ${xhr.status}.`);
//     fileInput.value = ""; // reset the input
//   };

//   // listen for response which will give the link
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState == XMLHttpRequest.DONE) {
//       onFileUploadSuccess(xhr.responseText);
//     }
//   };

//   xhr.open("POST", uploadURL);
//   xhr.send(formData);
// };

// const onFileUploadSuccess = (res) => {
//   fileInput.value = ""; // reset the input
//   status.innerText = "Uploaded";

//   // remove the disabled attribute from form btn & make text send
//   emailForm[2].removeAttribute("disabled");
//   emailForm[2].innerText = "Send";
//   progressContainer.style.display = "none"; // hide the box

//   const { file: url } = JSON.parse(res);
//   console.log(url);
//   sharingContainer.style.display = "block";
//   fileURL.value = url;
// };

// emailForm.addEventListener("submit", (e) => {
//   e.preventDefault(); // stop submission

//   // disable the button
//   emailForm[2].setAttribute("disabled", "true");
//   emailForm[2].innerText = "Sending";

//   const url = fileURL.value;

//   const formData = {
//     uuid: url.split("/").splice(-1, 1)[0],
//     emailTo: emailForm.elements["to-email"].value,
//     emailFrom: emailForm.elements["from-email"].value,
//   };
//   console.log(formData);
//   fetch(emailURL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(formData),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.success) {
//         showToast("Email Sent");
//         sharingContainer.style.display = "none"; // hide the box
//       }
//     });
// });

// let toastTimer;
// // the toast function
// const showToast = (msg) => {
//   clearTimeout(toastTimer);
//   toast.innerText = msg;
//   toast.classList.add("show");
//   toastTimer = setTimeout(() => {
//     toast.classList.remove("show");
//   }, 2000);
// };
