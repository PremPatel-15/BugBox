import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Bugreq } from '../../service/type';
import { BugService } from '../../service/bug-service';

@Component({
  selector: 'app-bug-form',
  imports: [ReactiveFormsModule],
  templateUrl: './bug-form.html',
  styleUrl: './bug-form.css',
})
export class BugForm {
  constructor(private bugService: BugService) {}

  addBugForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    priority: new FormControl('Low'),
    category: new FormControl('UI'),
    rootcause: new FormControl('UI Issue'),
    status: new FormControl('Open'),
    assignedTo: new FormControl('Prem'),
  });

  onSubmit() {
    const bugSend: Bugreq = {
      title: this.addBugForm.value.title ?? '',
      description: this.addBugForm.value.description ?? '',
      priority: this.addBugForm.value.priority ?? '',
      category: this.addBugForm.value.category ?? '',
      rootcause: this.addBugForm.value.rootcause ?? '',
      status: this.addBugForm.value.status ?? '',
      assignedTo: this.addBugForm.value.assignedTo ?? '',
    };

    this.bugService.postBug(bugSend).subscribe((res) => {
      console.log('Bug created:', res);
    });
  }
}
