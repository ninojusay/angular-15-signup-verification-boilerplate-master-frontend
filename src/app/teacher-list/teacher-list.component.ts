import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';

interface Teacher {
  id: number;
  name: string;
  subject: string;
  email: string;
  gender: string;
}

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.less']
})
export class TeacherListComponent implements OnInit {
  teachers: Teacher[] = [];
  teacherFormVisible = false;
  selectedTeacher: Teacher | null = null;
  teacherForm: any = { name: '', subject: '', email: '', gender: '' };

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.teacherService.getTeachers().subscribe((teachers) => {
      this.teachers = teachers;
    });
  }

  // Show the form for adding or editing a teacher
  openTeacherForm(teacher: Teacher | null = null): void {
    this.selectedTeacher = teacher;
    if (teacher) {
      this.teacherForm = { ...teacher }; // Populate form with selected teacher
    } else {
      this.teacherForm = { name: '', subject: '', email: '', gender: '' }; // Reset form for new teacher
    }
    this.teacherFormVisible = true;
  }

  // Handle form submission to add or update a teacher
  onSubmit(): void {
    if (this.selectedTeacher) {
      // Update teacher if one is selected
      this.teacherService.updateTeacher(this.selectedTeacher.id, this.teacherForm);
    } else {
      // Add a new teacher
      const newTeacher = { ...this.teacherForm, id: Date.now() };
      this.teacherService.createTeacher(newTeacher);
    }
    this.teacherFormVisible = false; // Hide the form after submission
  }

  // Delete a teacher
  deleteTeacher(id: number): void {
    if (confirm('Are you sure you want to delete this teacher?')) {
      this.teacherService.deleteTeacher(id);
    }
  }

  // Cancel form and hide it
  cancel(): void {
    this.teacherFormVisible = false;
  }
}
