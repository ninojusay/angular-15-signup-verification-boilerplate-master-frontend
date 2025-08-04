import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Teacher {
  id: number;
  name: string;
  subject: string;
  email: string;
  gender: string;
}

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private teachers: Teacher[] = []; // In-memory storage for teachers
  private teachersSubject = new BehaviorSubject<Teacher[]>(this.teachers);

  constructor() {}

  // Create a new teacher
  createTeacher(teacher: Teacher): void {
    this.teachers.push(teacher);
    this.teachersSubject.next(this.teachers);
  }

  // Get all teachers
  getTeachers(): Observable<Teacher[]> {
    return this.teachersSubject.asObservable();
  }

  // Update an existing teacher
  updateTeacher(id: number, updatedTeacher: Teacher): void {
    const index = this.teachers.findIndex(teacher => teacher.id === id);
    if (index !== -1) {
      this.teachers[index] = { ...this.teachers[index], ...updatedTeacher };
      this.teachersSubject.next(this.teachers);
    }
  }

  // Delete a teacher
  deleteTeacher(id: number): void {
    this.teachers = this.teachers.filter(teacher => teacher.id !== id);
    this.teachersSubject.next(this.teachers);
  }
}
