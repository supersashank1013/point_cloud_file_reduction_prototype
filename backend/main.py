import open3d as o3d  ## import the libraries to use

# # Original file read it
pcd = o3d.io.read_point_cloud("data/Bobcat Skid-Steer Loader.ply")
print("Original:",len(pcd.points))

#
# # Reduce the ply to some extent without losing the identity of the ply
reduced_pcd = pcd.voxel_down_sample(voxel_size=50)
print("Reduced:",len(reduced_pcd.points))
# #

# # Save the reduced file in the required directory
o3d.io.write_point_cloud("output/reducedbobcat.ply", reduced_pcd)
#
# # this statement is to check wheather there are no code errors
# print("Reduced Point Cloud file saved!")

# Render the 3D models to compare visually
o3d.visualization.draw_geometries([pcd])
o3d.visualization.draw_geometries([reduced_pcd])

def reduce_point_cloud(input_file, output_file, voxel_size):
    if voxel_size <= 0 :
        print("Error: Voxel size must be greater than zero!")
        return
    pcd = o3d.io.read_point_cloud(input_file)
    reduced_pcd = pcd.voxel_down_sample(voxel_size=voxel_size)
    o3d.io.write_point_cloud(output_file,reduced_pcd)
    reduction_percentage = ((len(pcd.points) - len(reduced_pcd.points) ) / len(pcd.points)) * 100

    return {print(f"Original Size:", len(pcd.points),
            "Reduced Size:", len(reduced_pcd.points),
            "Reduction Percentage:", reduction_percentage),
    o3d.visualization.draw_geometries([pcd]),
    o3d.visualization.draw_geometries([reduced_pcd])
    }

reduce_point_cloud("data/Bobcat Skid-Steer Loader.ply", "output/Bobcat Skid-Steer Loader reduced.ply", 50)

