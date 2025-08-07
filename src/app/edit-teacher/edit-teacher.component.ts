import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.less']
})
export class EditTeacherComponent implements OnInit {
  teacher: any = { name: '', subject: '', gender: '', activeStatus: 'Active' };
  teacherId!: number;  // Non-null assertion tells TypeScript this will be initialized later

  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get teacherId from the route parameters and fetch the teacher details
    this.teacherId = +this.route.snapshot.paramMap.get('id')!;
    this.getTeacherDetails();
  }

  // Fetch teacher details by ID
  getTeacherDetails(): void {
    this.teacherService.getTeacherById(this.teacherId).subscribe((data) => {
      this.teacher = data;  // Set the teacher data fetched from API
    });
  }

  // Update teacher details and redirect to teacher list
  updateTeacher(): void {
    this.teacherService.updateTeacher(this.teacherId, this.teacher).subscribe(() => {
      this.router.navigate(['/teachers']);  // Navigate to the teacher list after updating
    });
  }
}
