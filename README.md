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
