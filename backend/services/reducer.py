import open3d as o3d

def reduce_point_cloud(input_file, output_file, voxel_size):
    if voxel_size <= 0 :
        print("Error: Voxel size must be greater than zero!")
        return
    
    pcd = o3d.io.read_point_cloud(input_file) ## read the original point cloud file
    if len(pcd.points) == 0:
        return {
            "error": "Point cloud file could not be loaded."
        }
    reduced_pcd = pcd.voxel_down_sample(voxel_size=voxel_size) ## downsample the point cloud using voxel downsampling

    o3d.io.write_point_cloud(output_file,reduced_pcd)

    original_points = len(pcd.points)
    reduced_points = len(reduced_pcd.points)

    reduction_percentage = ((original_points - reduced_points)/ original_points) * 100 ## claculate the percentage of reduction in the point cloud

    return {    
    "original_points": original_points,
    "reduced_points": reduced_points,
    "reduction_percentage": round(reduction_percentage, 2)
    }