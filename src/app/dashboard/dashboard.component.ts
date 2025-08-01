import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services';  // Service to get account info
import { Account, Role } from '../_models';  // Assuming the Role model exists

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  account?: Account | null;
// Mock data for students with gender, evaluation status, submission date, and degree program
students = [
  { name: 'John Doe', email: 'john.doe@example.com', gender: 'Male', evaluationCompleted: true, submissionDate: new Date('2025-07-01T10:00:00'), degreeProgram: 'BSIT' },
  { name: 'Jane Smith', email: 'jane.smith@example.com', gender: 'Female', evaluationCompleted: false, submissionDate: null, degreeProgram: 'BSED' },
  { name: 'Mark Brown', email: 'mark.brown@example.com', gender: 'Male', evaluationCompleted: true, submissionDate: new Date('2025-07-02T11:15:00'), degreeProgram: 'BSHM' },
  { name: 'Emily Davis', email: 'emily.davis@example.com', gender: 'Female', evaluationCompleted: false, submissionDate: null, degreeProgram: 'BSIT' }
];

// Mock data for teachers with gender, subject/courses, evaluations sent/completed, and feedbacks
teachers = [
  {
    name: 'Mr. Jones',
    gender: 'Male',
    subject: 'Computer Science', // Teacher's subject/course
    evaluationsSent: 4,
    evaluationsCompleted: 3,
    feedbacks: [
      { studentName: 'John Doe', rating: 4, comment: 'Good teaching', submissionDate: new Date('2025-07-01T10:00:00') },
      { studentName: 'Jane Smith', rating: 5, comment: 'Excellent!', submissionDate: new Date('2025-07-01T11:00:00') },
      { studentName: 'Mark Brown', rating: 3, comment: 'Could improve communication', submissionDate: new Date('2025-07-02T12:00:00') }
    ]
  },
  {
    name: 'Ms. Taylor',
    gender: 'Female',
    subject: 'Business Studies', // Teacher's subject/course
    evaluationsSent: 4,
    evaluationsCompleted: 2,
    feedbacks: [
      { studentName: 'John Doe', rating: 2, comment: 'Could be more engaging', submissionDate: new Date('2025-07-01T10:30:00') },
      { studentName: 'Jane Smith', rating: 4, comment: 'Great teacher', submissionDate: new Date('2025-07-02T12:30:00') }
    ]
  },
  {
    name: 'Mr. Williams',
    gender: 'Male',
    subject: 'Mathematics', // Teacher's subject/course
    evaluationsSent: 5,
    evaluationsCompleted: 5,
    feedbacks: [
      { studentName: 'John Doe', rating: 5, comment: 'Amazing teacher!', submissionDate: new Date('2025-07-01T10:45:00') },
      { studentName: 'Jane Smith', rating: 5, comment: 'Fantastic!', submissionDate: new Date('2025-07-01T11:45:00') },
      { studentName: 'Mark Brown', rating: 4, comment: 'Very knowledgeable', submissionDate: new Date('2025-07-02T13:00:00') },
      { studentName: 'Emily Davis', rating: 5, comment: 'Enjoyable classes', submissionDate: new Date('2025-07-03T14:00:00') },
      { studentName: 'Markus Green', rating: 5, comment: 'Really helpful', submissionDate: new Date('2025-07-03T15:00:00') }
    ]
  }
];



  evaluationsCompleted = 0;
  evaluationsPending = 0;
  evaluationResults = { averageScore: 75 };  // Mock evaluation result data
  totalStudents = 0;  // Track total students
  totalStudentsPendingEvaluation = 0;  // Track students who haven't completed evaluations

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    // Get account details from the service (Admin or User)
    this.accountService.account.subscribe(x => {
      this.account = x;
      this.calculateEvaluationStats();
      this.totalStudents = this.students.length;  // Set total students count
      this.totalStudentsPendingEvaluation = this.getTotalStudentsPendingEvaluation();  // Set pending evaluations count
    });
  }

  // Calculate the number of completed and pending evaluations
  calculateEvaluationStats(): void {
    this.evaluationsCompleted = this.students.filter(student => student.evaluationCompleted).length;
    this.evaluationsPending = this.students.filter(student => !student.evaluationCompleted).length;
  }

  // Getter to find the submission date of the logged-in student
  getSubmissionDate(): string {
    const student = this.students.find(s => s.email === this.account?.email);
    return student?.submissionDate ? student.submissionDate.toLocaleDateString() : 'N/A';
  }

  // Get total number of students
  getTotalStudents(): number {
    return this.totalStudents;
  }

  // Get total number of students who have NOT completed the evaluation
  getTotalStudentsPendingEvaluation(): number {
    return this.students.filter(student => !student.evaluationCompleted).length;
  }

  // Filter students who have not completed the evaluation
  getStudentsPendingEvaluation(): any[] {
    return this.students.filter(student => !student.evaluationCompleted);
  }

  // Calculate total ratings of teachers (for admin dashboard)
  getTeacherTotalRatings(teacher: any): number {
    return teacher.feedbacks.reduce((sum: number, feedback: any) => sum + feedback.rating, 0);
  }

  // Calculate the average rating for a teacher
  getTeacherAverageRating(teacher: any): number {
    const totalRatings = this.getTeacherTotalRatings(teacher);
    const numberOfFeedbacks = teacher.feedbacks.length;
    return numberOfFeedbacks > 0 ? parseFloat((totalRatings / numberOfFeedbacks).toFixed(2)) : 0;
  }
}
