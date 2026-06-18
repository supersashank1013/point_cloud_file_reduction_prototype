import os

from fastapi import FastAPI, File, HTTPException, UploadFile
from services.reducer import reduce_point_cloud
from fastapi.responses import FileResponse


app = FastAPI()

@app.get("/")
def home():
    return {
        "message" : "VORTEX API is running"
    }

@app.get("/health")
def health():
    return {
        "status" : "healthy"
    }

@app.post("/reduce")
async def reduce(file: UploadFile = File(...), voxel_size: float = 0.05):
    upload_path = f"uploads/{file.filename}"
    output_path = f"output/reduced_{file.filename}"
    
    with open(upload_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
        
    
    result = reduce_point_cloud(upload_path, output_path, voxel_size)
    
    os.remove(upload_path)  ## remove the uploaded file after processing
    
    return {
        "status": "success",
        **result,
        "download_url": f"/download/reduced_{file.filename}"
    }

@app.get("/download/{fileName}")
def download_file(fileName: str):

    file_path = f"output/{fileName}"

    if not fileName.lower().endswith(".ply"):
        raise HTTPException(
            status_code = 400, 
            detail = "Invalid file type. Only .ply files are allowed."
        )

    if not os.path.exists(file_path):
        raise HTTPException(
            status_code = 404, 
            detail = "File not found"
        )
    return FileResponse (
        path = file_path,
        filename = fileName
    )



