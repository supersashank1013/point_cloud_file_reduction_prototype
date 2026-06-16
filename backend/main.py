from fastapi import FastAPI
from pydantic import BaseModel
from services.reducer import reduce_point_cloud


app = FastAPI()

class ReductionRequest(BaseModel):
    input_file: str ## must be a string "sample.ply" or "sample.pcd"
    output_file: str ## output file name must be a string "reduced_sample.ply" or "reduced_sample.pcd"
    voxel_size: float ## must be a float greater than zero

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
def reduce(request: ReductionRequest):

    result = reduce_point_cloud(
        request.input_file,
        request.output_file,
        request.voxel_size
    )

    return result