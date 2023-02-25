import { Component, ViewChild, ElementRef } from "@angular/core";
import { EmployeeService } from "./employee.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "coding-test";
  employeeList: any = [];
  showHideWorkModal: boolean = false;
  showHideVocation: boolean = false;
  selectedEmployee: any;
  workInput: string = "";
  vocationInput: string = "";
  toastMessage = "This is a toast";
  showsToast = false;

  @ViewChild("workModal", { static: false }) workModal!: ElementRef;
  @ViewChild("vocationModal", { static: false }) vocationModal!: ElementRef;

  constructor(private _employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployee();
  }

  loadEmployee() {
    this._employeeService.getEmployee().subscribe(
      (resp: any) => {
        this.employeeList = resp || [];
      },
      (err: any) => {
        console.log("err", err);
      }
    );
  }

  closeToast() {
    setTimeout(() => {
      this.toastMessage = "This is a toast";
      this.showsToast = false;
    }, 3000);
  }

  handleShowWork(emp: any) {
    this.workModal.nativeElement.style.display = "block";
    this.showHideWorkModal = !this.showHideWorkModal;
    this.selectedEmployee = emp;
  }
  handleHideWork() {
    this.workModal.nativeElement.style.display = "none";
    this.showHideWorkModal = !this.showHideWorkModal;
    this.workInput = "";
  }

  handleShowVocation(emp: any) {
    this.vocationModal.nativeElement.style.display = "block";
    this.showHideVocation = !this.showHideVocation;
    this.selectedEmployee = emp;
  }

  handleHideVocation() {
    this.vocationModal.nativeElement.style.display = "none";
    this.showHideVocation = !this.showHideVocation;
    this.vocationInput = "";
  }

  submitWork() {
    if (parseInt(this.workInput) > 260) {
      this.toastMessage = "Work value must be less then 260";
      this.showsToast = true;
      this.closeToast();
      this.handleHideWork();
      return;
    }
    const payload = {
      id: this.selectedEmployee?.empId,
      value: this.workInput,
    };
    this._employeeService.updateWork(payload).subscribe(
      (resp: any) => {
        console.log("resp", resp);
        this.showsToast = true;
        this.toastMessage = "Update work successfully.";
        this.closeToast();
        this.loadEmployee();
        this.handleHideWork();
      },
      (err: any) => {
        console.log("err", err);
        this.showsToast = true;
        this.toastMessage = err?.error?.detail;
        this.closeToast();
        this.handleHideWork();
      }
    );
  }

  submitVocation() {
    if (parseInt(this.vocationInput) > 260) {
      this.toastMessage = "Vocation value must be less then 260";
      this.showsToast = true;
      this.closeToast();
      this.handleHideVocation();
      return;
    }
    const payload = {
      id: this.selectedEmployee?.empId,
      value: this.vocationInput,
    };
    this._employeeService.updateVacation(payload).subscribe(
      (resp: any) => {
        console.log("resp", resp);
        this.showsToast = true;
        this.toastMessage = "Update vocation successfully.";
        this.closeToast();
        this.loadEmployee();
        this.handleHideVocation();
      },
      (err: any) => {
        console.log("err", err);
        this.showsToast = true;
        this.toastMessage = err?.error?.detail;
        this.closeToast();
        this.handleHideVocation();
      }
    );
  }
}
