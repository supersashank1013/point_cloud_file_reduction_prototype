# VORTEX - Point Cloud Reduction System

## Overview

VORTEX is a Point Cloud Reduction System developed using Python, Open3D, and FastAPI. The objective of the project is to reduce the storage requirements of large point cloud datasets while preserving their overall geometric structure through voxel-based downsampling.

The system provides REST APIs that allow users to upload point cloud files, perform reduction operations, and download optimized point clouds.

---

# Features

* Upload `.ply` point cloud files
* Perform voxel-based point cloud reduction
* Calculate storage reduction statistics
* Download reduced point cloud files
* Automatic cleanup of temporary uploaded files
* Interactive API testing using Swagger UI
* Modular FastAPI backend architecture

---

# Tech Stack

| Component              | Technology         |
| ---------------------- | ------------------ |
| Backend Framework      | FastAPI            |
| Language               | Python             |
| Point Cloud Processing | Open3D             |
| API Documentation      | Swagger UI         |
| Validation             | FastAPI + Pydantic |
| Server                 | Uvicorn            |

---

# System Architecture

```text
User
 │
 ▼
Swagger UI / Frontend
 │
 ▼
POST /reduce
 │
 ▼
FastAPI Backend
 │
 ▼
File Upload Handling
 │
 ▼
Open3D Reduction Engine
 │
 ▼
Voxel Downsampling
 │
 ▼
Reduced Point Cloud
 │
 ▼
GET /download/{filename}
 │
 ▼
Download Reduced File
```

---
# Internal Working of VORTEX

## Overview

VORTEX follows a service-oriented architecture where the FastAPI backend handles user requests and delegates point cloud processing tasks to the Open3D reduction engine.

The complete workflow is illustrated below:

```text
User Uploads Point Cloud
           ↓
      POST /reduce
           ↓
FastAPI Receives File
           ↓
Store File in uploads/
           ↓
Call reduce_point_cloud()
           ↓
Open3D Reads Point Cloud
           ↓
Voxel Downsampling
           ↓
Save Reduced File
           ↓
Delete Original Upload
           ↓
Return Statistics + Download URL
```

---

## File Upload Pipeline

When a user uploads a `.ply` file through Swagger UI or the future frontend application:

1. FastAPI receives the uploaded file using the `UploadFile` object.
2. The file is temporarily stored inside the `uploads/` directory.
3. The original filename is preserved for processing.
4. An output filename is generated automatically.

### Example

```text
Input:
uploads/building_scan.ply

Output:
output/reduced_building_scan.ply
```

---

## Reduction Engine Workflow

The reduction engine is implemented in `services/reducer.py`.

### Step 1 – Read Point Cloud

```python
pcd = o3d.io.read_point_cloud(input_file)
```

The point cloud is loaded into memory using Open3D.

### Step 2 – Compute Original Statistics

Before reduction, the following metrics are collected:

* Original file size
* Original point count

These values are later used for comparison.

### Step 3 – Apply Voxel Downsampling

```python
reduced_pcd = pcd.voxel_down_sample(
    voxel_size=voxel_size
)
```

Voxel downsampling divides the point cloud into 3D cubes called voxels.

All points inside a voxel are represented by a single representative point.

This significantly reduces:

* Number of points
* File size
* Computational complexity

while preserving the overall geometry.

### Step 4 – Save Reduced Point Cloud

```python
o3d.io.write_point_cloud(
    output_file,
    reduced_pcd
)
```

The optimized point cloud is stored inside the `output/` directory.

### Step 5 – Compute Reduction Metrics

After processing, the system calculates:

* Reduced file size
* Reduction percentage
* Storage savings

These metrics are returned to the client through the API response.

---

## Download Pipeline

The reduced point cloud can be downloaded using:

```http
GET /download/{filename}
```

### Workflow

```text
Receive Filename
       ↓
Validate Request
       ↓
Check File Exists
       ↓
Return FileResponse
       ↓
User Downloads File
```

---

## Source Code Organization

### `main.py`

**Responsibilities**

* Create FastAPI application
* Define REST API endpoints
* Handle file uploads
* Handle file downloads
* Validate requests
* Return API responses

### `reducer.py`

**Responsibilities**

* Read point cloud files
* Apply voxel downsampling
* Save optimized point clouds
* Calculate statistics
* Return reduction results

---

## Sequence Diagram

```text
Client
  │
  │ POST /reduce
  ▼
FastAPI
  │
  │ Save Uploaded File
  ▼
uploads/
  │
  │ Call Reduction Service
  ▼
Open3D
  │
  │ Voxel Downsampling
  ▼
Reduced Point Cloud
  │
  │ Save Output
  ▼
output/
  │
  │ Return Statistics
  ▼
Client
```

---

## Design Decisions

### Temporary Upload Storage

Uploaded files are deleted after successful reduction to minimize storage consumption.

### Persistent Output Storage

Reduced point clouds remain available for download.

### Modular Architecture

Processing logic is separated from API logic to improve maintainability and scalability.

### Future Scalability

The architecture allows future integration of:

* React Frontend
* GPU Acceleration
* Intelligent Voxel Recommendation
* Advanced Point Cloud Operations
* Cloud Deployment

---

## Example End-to-End Execution

```text
User uploads: bridge_scan.ply
        ↓
Stored in uploads/bridge_scan.ply
        ↓
Open3D loads point cloud
        ↓
Voxel downsampling applied
        ↓
Reduced file generated
        ↓
Stored as output/reduced_bridge_scan.ply
        ↓
Original upload deleted
        ↓
Statistics returned to user
        ↓
User downloads reduced file
```


# Project Structure

```text
PointCloudReduction/
│
├── backend/
│   ├── main.py
│   ├── services/
│   │   └── reducer.py
│   ├── uploads/
│   └── output/
│
└── frontend/ (Planned)
```

---

# Point Cloud Reduction Methodology

## Input

The system accepts point cloud files in `.ply` format.

These files may be generated through:

* Photogrammetry
* LiDAR Scanning
* Laser Scanning
* Surveying Instruments
* 3D Reconstruction Systems

---

## Voxel Downsampling

Voxel Downsampling divides the entire point cloud into a 3D grid of cubes called voxels.

```text
Multiple Points
      ↓
 Single Representative Point
```

For every voxel, nearby points are replaced with a representative point.

This reduces:

* Number of points
* File size
* Processing time
* Memory consumption

while preserving the overall geometry of the model.

---

# Observations

As voxel size increases:

```text
Voxel Size ↑
      ↓
Points Retained ↓
      ↓
Storage Size ↓
```

However:

```text
Voxel Size ↑
      ↓
Geometric Detail ↓
```

Therefore, selecting an appropriate voxel size is critical.

---

# Core Reduction Function

```python
reduce_point_cloud(
    input_file,
    output_file,
    voxel_size
)
```

### Responsibilities

* Load point cloud file
* Apply voxel downsampling
* Generate reduced point cloud
* Save reduced point cloud
* Calculate file size statistics
* Return reduction metrics

---

# API Documentation

## Health Check

### Endpoint

```http
GET /health
```

### Response

```json
{
  "status": "healthy"
}
```

---

## Reduce Point Cloud

### Endpoint

```http
POST /reduce
```

### Inputs

| Parameter  | Type       |
| ---------- | ---------- |
| file       | UploadFile |
| voxel_size | float      |

### Workflow

```text
Upload File
      ↓
Save Temporarily
      ↓
Reduce Point Cloud
      ↓
Save Reduced File
      ↓
Delete Original Upload
      ↓
Return Statistics
```

### Example Response

```json
{
  "status": "success",
  "original_size_kb": 1920,
  "reduced_size_kb": 32,
  "file_reduc_percent": 98.33,
  "download_url": "/download/reduced_sample.ply"
}
```

---

## Download Reduced File

### Endpoint

```http
GET /download/{filename}
```

### Workflow

```text
Receive Filename
      ↓
Validate Request
      ↓
Check File Existence
      ↓
Return File
```

### Response

```text
Reduced Point Cloud File
```

---

# Validation Strategy

## FastAPI Validation

Automatically handles:

* Missing fields
* Invalid data types
* Malformed requests

Example response:

```text
422 Unprocessable Entity
```

---

## Business Validation

Custom validation rules:

* Voxel size must be greater than zero
* Point cloud must not be empty
* Valid point cloud file format
* File must exist before download

---

# File Management

## Uploads Folder

```text
uploads/
```

Purpose:

* Temporary storage for uploaded files

After successful reduction:

```text
Uploaded file deleted automatically
```

to minimize storage usage.

---

## Output Folder

```text
output/
```

Purpose:

* Store reduced point clouds

Files remain available for download.

Future versions may include automatic cleanup jobs.

---

# Experimental Results

## Dataset 1

```text
Original Size      : 1920 KB
Original Points    : 40,097

Voxel Size         : 0.005

Reduced Size       : 32 KB
Reduced Points     : 1,335

Storage Reduction  : 98.33%
```

---

## Dataset 2

```text
Original Size      : 145 MB
Original Points    : 4,024,376

Voxel Size         : 50

Reduced Size       : 376 KB
Reduced Points     : 16,008
```

---

# Key Learnings

Through this project, the following concepts were explored:

* Point Cloud Processing
* Open3D
* Voxel Downsampling
* REST APIs
* FastAPI
* Swagger UI
* File Upload APIs
* File Download APIs
* Backend Validation
* Temporary File Handling
* Software Architecture

---

# Future Enhancements

## Frontend Development

Planned technology stack:

* React
* TypeScript
* TailwindCSS

Features:

* File upload interface
* Reduction statistics dashboard
* Download management
* User-friendly workflow

---

## Intelligent Voxel Recommendation

Current approach:

```text
User selects voxel size manually
```

Future approach:

```text
System analyzes point cloud
        ↓
Recommends optimal voxel size
```

based on:

* Point density
* Point count
* Bounding box dimensions
* Target compression ratio

---

## Advanced Point Cloud Operations

Future modules:

* Point Cloud Segmentation
* Feature Extraction
* Object Detection
* Point Cloud Registration
* Image Matching
* Geometric Analysis

---

# Authors

Developed as part of a Point Cloud Reduction research and development project using FastAPI and Open3D.

Project Codename:

```text
VORTEX
```
