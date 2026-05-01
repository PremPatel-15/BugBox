import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Bugreq } from '../../service/type';
import { BugService } from '../../service/bug-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bug-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './bug-form.html',
  styleUrl: './bug-form.css',
})
export class BugForm {
  constructor(
    private bugService: BugService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  addBugForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    priority: new FormControl('Low', Validators.required),
    category: new FormControl('UI', Validators.required),
    rootcause: new FormControl('UI Issue', Validators.required),
    status: new FormControl('Open', Validators.required),
    assignedTo: new FormControl('Prem', Validators.required),
  });

  bugId: number | undefined = undefined;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.bugId = +id;

        this.bugService.getBugById(this.bugId).subscribe({
          next: (data) => {
            this.addBugForm.patchValue(data);
          },
          error: (err) => {
            console.log('Error: ', err);
          },
        });
      }
    });
  }

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

    if (this.bugId) {
      this.bugService.putBug(this.bugId, bugSend).subscribe({
        next: (res) => {
          console.log('Bug created:', res);
        },
        error: (err) => {
          console.log('Bug created:', err);
        },
      });
    } else {
      this.bugService.postBug(bugSend).subscribe({
        next: (res) => {
          console.log('Bug created:', res);
        },
        error: (err) => {
          console.log('Bug created:', err);
        },
      });
    }

    alert('Saved');
    this.router.navigate(['/buglist']);
  }
}
