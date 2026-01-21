const fs=require("fs");
//fs.copyFileSync("../testing.txt","copied.txt")
fs.copyFile("../testing txt","copied.txt",(err)=>{
    if(err){
        console.log("error")
        return;
    }
    console.log("File copied")
})

try{
    fs.readFileSync("copied.txt","utf-8")
    console.log("file is copied")
}
catch(err){
    console.log("Error while copying file")
}

fs.unlink("newFile.txt",(err)=>{
    if(err){
        console.log("error in deleting file")
        return;
    }
    console.log("File deleted successfully")
})
fs.writeFile("newFile.txt","This is a new file",(err)=>{
    if(err){
        console.log("error in creating file")
        return;
    }
    console.log("File created successfully")
})

fs.mkdir("Folders/Folder1/Folder2",{recursive:true},(err)=>{
    if(err){
        console.log("error in creating directory")
        return;
    }
    console.log("Directory created successfully")
})
fs.readdir("./file-handling",(err,files)=>{
    if(err){
        console.log("error in reading directory")
        return;
    }
    console.log(files)
})