import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  ISkill,
  ISkillItem,
  SkillsService,
} from "../../services/skills.service";
import { SharedService } from "../../services/shared.service";

@Component({
  selector: "app-skills",
  templateUrl: "./skills.component.html",
  styleUrls: ["./skills.component.css"],
})
export class SkillsComponent implements OnInit {
  skills: ISkill[] = [];
  isEdit: boolean = false;
  editId: number | null = null;
  editSkillIndex: number = 0;
  editItemIndex: number = 0;

  skillPopupActive: boolean = false;
  skillPopupFooterActive: boolean = true;
  skillPopupBtnActive: boolean = true;

  itemPopupActive: boolean = false;
  itemPopupImgActive: boolean = true;

  skillForm: FormGroup;
  skillItemForm: FormGroup;
  skillModalTitle: string = "";
  skillModalButton: string = "";

  skillItemModalTitle: string = "";
  skillItemModalButton: string = "";

  selectedImage: string = "";
  imageURL: string = "http://localhost:5000/";

  constructor(
    private fb: FormBuilder,
    private skillsService: SkillsService // private sharedService: SharedService
  ) {
    this.skillForm = this.fb.group({
      skillCategory: ["", Validators.required],
      skillExperience: ["", Validators.required],
    });

    this.skillItemForm = this.fb.group({
      skillItemImage: [null, Validators.required],
      skillItemName: ["", Validators.required],
    });
  }

  ngOnInit() {
    // Api Call
    this.skillsService.getAllSkills().subscribe((skills) => {
      this.skills = skills;
    });
  }

  /* ===== Manage Skill Part ===== */

  addSkill(): void {
    this.setSkillModal(false, 0, {});
    this.skillForm.reset();
    this.skillForm.enable();
  }

  editSkill(index: number, skill: ISkill): void {
    this.setSkillModal(true, index, skill);
    this.skillForm.enable();
  }

  deleteSkill(index: number): void {
    if (confirm("Are you sure you want to delete this skill?")) {
      this.skillsService.deleteSkill(this.skills[index]._id).subscribe(() => {
        this.skills.splice(index, 1);
      });
    }
  }

  private setSkillModal(editVal: boolean, index: number, data: any) {
    this.skillPopupActive = true;
    this.skillPopupBtnActive = true;

    this.isEdit = editVal;
    this.editSkillIndex = index;

    this.skillForm.patchValue({
      skillCategory: data.category || "",
      skillExperience: data.experience || "",
    });
  }

  onSubmitSkill(): void {
    const skillId = this.isEdit ? this.skills[this.editSkillIndex!]._id : "";
    const skillsList = this.isEdit
      ? this.skills[this.editSkillIndex!].skillsList
      : [];

    const formData: ISkill = {
      _id: skillId,
      category: this.skillForm.value.skillCategory,
      experience: this.skillForm.value.skillExperience,
      skillsList: skillsList,
    };

    this.saveSkillData(formData);
    this.closeSkillModal();
  }

  private saveSkillData(formData: ISkill) {
    if (this.isEdit) {
      this.skillsService.updateSkill(formData).subscribe(() => {
        this.closeSkillModal();
      });
    } else {
      this.skillsService.addSkill(formData).subscribe(() => {
        this.closeSkillModal();
      });
    }
  }

  closeSkillModal(): void {
    this.skillPopupActive = false;
  }

  /* ===== Manage Skill-Item Part ===== */

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.skillForm.patchValue({
        skillItemImage: file,
      });
    }
  }

  addSkillItem(skillIndex: number): void {
    this.setSkillItemModal(false, skillIndex, 0, {});
    this.skillForm.reset();
    this.skillForm.enable();
  }

  editSkillItem(skillIndex: number, itemIndex: number, item: ISkillItem): void {
    this.setSkillItemModal(true, skillIndex, itemIndex, item);
    this.skillForm.enable();
  }

  deleteSkillItem(skillIndex: number, itemIndex: number): void {
    if (confirm("Are you sure you want to delete this skill item?")) {
      const skillId = this.skills[skillIndex]._id;
      const itemId = this.skills[skillIndex].skillsList[itemIndex]._id;
      this.skillsService.deleteSkillItem(skillId, itemId).subscribe(() => {
        this.skills[skillIndex].skillsList.splice(itemIndex, 1);
      });
    }
  }

  private setSkillItemModal(
    editVal: boolean,
    skillIndex: number,
    itemIndex: number,
    data: any
  ) {
    this.itemPopupActive = true;
    this.selectedImage = data.image;

    this.isEdit = editVal;
    this.editSkillIndex = skillIndex;
    this.editItemIndex = itemIndex;

    this.skillItemForm.patchValue({
      skillItemName: data.name || "",
    });
  }

  onSubmitSkillItem(): void {
    if (this.skillItemForm.valid) {
      const skillEditId: string = this.skills[this.editSkillIndex]._id;

      let itemId: string = "";

      if (this.isEdit) {
        itemId =
          this.skills[this.editSkillIndex].skillsList[this.editItemIndex]._id;
      }

      console.log({ itemId: itemId });

      const formData = new FormData();
      formData.append("name", this.skillItemForm.get("skillItemName")?.value);

      if (this.skillItemForm.get("skillItemImage")?.value) {
        formData.append(
          "image",
          this.skillItemForm.get("skillItemImage")?.value
        );
      }

      this.saveSkillItemData(formData, skillEditId, itemId);
    }
  }

  private saveSkillItemData(formData: any, skillId: string, itemId: string) {
    if (this.isEdit) {
      this.skillsService
        .updateSkillItem(formData, skillId, itemId)
        .subscribe(() => {
          this.closeItemModal();
        });
    } else {
      this.skillsService.addSkillItem(formData, skillId).subscribe(() => {
        this.closeItemModal();
      });
    }
  }

  closeItemModal(): void {
    this.itemPopupActive = false;
  }
}
