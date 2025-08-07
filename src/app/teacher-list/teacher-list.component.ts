import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.less']
})
export class TeacherListComponent implements OnInit {
  teachers: any[] = [];
  filteredTeachers: any[] = []; // Holds the filtered teacher list
  searchText: string = '';      // Bind to the search input
  isLoading: boolean = false;  // Track loading state
  errorMessage: string = '';   // To display error messages if any

  constructor(private teacherService: TeacherService, private router: Router) {}

  ngOnInit(): void {
    this.fetchTeachers();
  }

  // Fetch all teachers from the API
  fetchTeachers(): void {
    this.isLoading = true; // Set loading state to true
    this.teacherService.getTeachers().subscribe(
      (data) => {
        this.teachers = data;
        this.filteredTeachers = data; // Initially, display all teachers
        this.isLoading = false; // Set loading state to false after fetching data
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load teachers. Please try again later.';
        console.error('Error fetching teachers:', error);
      }
    );
  }

  // Search teachers based on name, subject, or gender
  searchTeachers(): void {
    this.filteredTeachers = this.teachers.filter((teacher) =>
      teacher.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(this.searchText.toLowerCase()) ||
      teacher.gender.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // Navigate to the Add Teacher page
  navigateToAddTeacher(): void {
    this.router.navigate(['/add-teacher']);  // Navigate to Add Teacher page
  }

  // Delete teacher
  deleteTeacher(id: number): void {
    if (confirm('Are you sure you want to delete this teacher?')) {
      this.teacherService.deleteTeacher(id).subscribe(
        () => {
          this.fetchTeachers();  // Refresh teacher list after deletion
        },
        (error) => {
          this.errorMessage = 'Error deleting teacher. Please try again later.';
          console.error('Error deleting teacher:', error);
        }
      );
    }
  }

  // Navigate to the Edit Teacher page
  editTeacher(id: number): void {
    this.router.navigate([`/edit-teacher/${id}`]);  // Navigate to Edit Teacher page
  }
}
