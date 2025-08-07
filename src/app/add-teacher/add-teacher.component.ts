import { Component } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.less']  // Assuming you are using LESS
})
export class AddTeacherComponent {
  teacher = { name: '', subject: '', gender: '', activeStatus: 'Active' };
  errorMessage: string = '';  // For storing error messages
  successMessage: string = '';  // For storing success messages

  constructor(private teacherService: TeacherService, private router: Router) {}

  // Add a new teacher
  addTeacher(): void {
    if (!this.teacher.name || !this.teacher.subject || !this.teacher.gender) {
      this.errorMessage = 'All fields are required!';
      return;  // Prevent form submission if validation fails
    }

    this.teacherService.createTeacher(this.teacher).subscribe(
      () => {
        this.successMessage = 'Teacher added successfully!';
        this.errorMessage = '';  // Clear any previous errors
        this.router.navigate(['/teachers']);  // Redirect to teacher list after adding
      },
      (error) => {
        this.errorMessage = 'Error adding teacher. Please try again.';
        this.successMessage = '';  // Clear success message if there's an error
        console.error('Error:', error);
      }
    );
  }
}
