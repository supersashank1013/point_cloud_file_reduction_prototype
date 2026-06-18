import open3d as o3d
import os

def reduce_point_cloud(input_file, output_file, voxel_size):
    if voxel_size <= 0 :
        print("Error: Voxel size must be greater than zero!")
        return
    
    pcd = o3d.io.read_point_cloud(input_file) ## read the original point cloud file
    
    if len(pcd.points) == 0:
        return {
            "error": "Point cloud file could not be loaded."
        }
    
    original_size_bytes = os.path.getsize(input_file)              
    
    reduced_pcd = pcd.voxel_down_sample(voxel_size=voxel_size)     
    o3d.io.write_point_cloud(output_file,reduced_pcd)
    reduced_size_bytes = os.path.getsize(output_file)

    
    original_size_kb = round(original_size_bytes / 1024, 2)
    reduced_size_kb = round(reduced_size_bytes / 1024, 2)

    file_reduc_precent = ((original_size_kb - reduced_size_kb)/ original_size_kb) * 100   ## claculate the percentage of reduction in the point cloud

    return {    
    "original_size_kb": original_size_kb,
    "reduced_size_kb": reduced_size_kb,
    "file_reduc_precent": round(file_reduc_precent, 2)
    }