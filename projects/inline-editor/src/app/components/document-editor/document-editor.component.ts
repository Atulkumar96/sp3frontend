import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  CustomToolbarItemModel,
  DocumentEditorContainerComponent,
  RevisionCollection,
} from '@syncfusion/ej2-angular-documenteditor';
import { ToastComponent } from '@syncfusion/ej2-angular-notifications';
import { ToolbarClickEventArgs } from '@syncfusion/ej2-angular-richtexteditor';
import { userDetails } from 'projects/inline-editor/src/constants/userMockData';

@Component({
  selector: 'app-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.scss'],
})
export class DocumentEditorComponent implements OnInit, AfterViewInit {
  @ViewChild('document_editor')
  public container!: DocumentEditorContainerComponent;
  private history: string[] = [];
  //Custom toolbat item.
  public toolSaveItem: CustomToolbarItemModel = {
    prefixIcon: 'e-save',
    tooltipText: 'Save Document',
    text: this.onWrapText('Save Document'),
    id: 'Save Document',
  };
  public toolApproveItem: CustomToolbarItemModel = {
    prefixIcon: 'e-check',
    tooltipText: 'Approve Document',
    text: this.onWrapText('Approve Document'),
    id: 'Approve Document',
  };

  public items: any = [
    'New',
    'Open',
    this.toolSaveItem,
    'Separator',
    'Undo',
    'Redo',
    'Separator',
    'Image',
    'Table',
    'Hyperlink',
    'Bookmark',
    'TableOfContents',
    'Separator',
    'Header',
    'Footer',
    'PageSetup',
    'PageNumber',
    'Break',
    'InsertFootnote',
    'InsertEndnote',
    'Separator',
    'Find',
    'Separator',
    'Comments',
    'TrackChanges',
    'Separator',
    'LocalClipboard',
    'RestrictEditing',
    'Separator',
    'FormFields',
    'UpdateFields',
    'ContentControl',
  ];
  public userInfo: any = {};
  @ViewChild('toast') toast!: ToastComponent;

  constructor(private http: HttpClient, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }

  ngOnInit(): void {
    this.getUserDetails();
  }
  ngAfterViewInit(): void {}

  getUserDetails() {
    userDetails().then((res: any) => {
      this.userInfo = res;
      if (this.userInfo.approver) {
        this.items.splice(3, 0, this.toolApproveItem);
        this.container.refresh();
      }
    });
  }

  public onToolbarClick(args: ToolbarClickEventArgs): void {
    switch (args.item.id) {
      case 'Approve Document':
        this.onApproveDocument();
        break;
      case 'Save Document':
        this.onSaveDocument();
        break;
    }
  }

  private onWrapText(text: string): string {
    let content: string = '';
    const index: number = text.lastIndexOf(' ');

    if (index !== -1) {
      content =
        text.slice(0, index) +
        "<div class='e-de-text-wrap'>" +
        text.slice(index + 1) +
        '</div>';
    } else {
      content = text;
    }

    return content;
  }

  onCreated() {
    //Specifies the language id to map server side dictionary.
    // this.container.documentEditor.spellChecker.languageID = 1033;
    // this.container.documentEditor.spellChecker.removeUnderline = false;
    // this.container.documentEditor.spellChecker.allowSpellCheckAndSuggestion =
    //   true;
  }

  onContentChange(event: any) {
    console.log('onContentChange--', event);
    this.container.documentEditor.showRevisions = true;
    let revisions: RevisionCollection = this.container.documentEditor.revisions;
  }
  // Function to handle saving the document
  public onSaveDocument(): void {
    const editor = this.container.documentEditor;
    const documentData = editor.serialize();
    const payload = {
      fileName: `${editor.documentName}.docx`,
      content: documentData,
    };
    this.http
      .post(this.container.serviceUrl + 'Save', payload, {
        responseType: 'text',
      })
      .subscribe(
        (sfdt: string) => {
          this.toast.content = 'Document Saved!';
          this.toast.title = 'Success';
          this.toast.cssClass = 'e-toast-success';
          this.toast.show();
        },
        (error: any) => {
          this.toast.content = 'Something went wrong!';
          this.toast.title = 'Error';
          this.toast.cssClass = 'e-toast-danger';
          this.toast.show();
          console.error('Error during conversion:', error);
          if (error.status === 0) {
            console.error('Network error or CORS issue');
          } else {
            console.error('API error:', error.status, error.message);
          }
        }
      );
  }
  isValidFile(file: File): boolean {
    const allowedExtensions = ['docx'];
    const allowedMimeTypes = [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    return (
      fileExtension !== undefined &&
      allowedExtensions.includes(fileExtension) &&
      allowedMimeTypes.includes(file.type)
    );
  }
  // Function to handle approval process
  public async onApproveDocument() {
    const editor = this.container.documentEditor;
    editor.saveAsBlob('Docx').then((exportedDocument: Blob) => {
      const blob = exportedDocument;
      const file = new File([blob], `${editor.documentName}.docx`, {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      let formdata = new FormData();
      formdata.append('files', file);
      formdata.append('approverName', this.userInfo.userName);

      this.http
        .post(this.container.serviceUrl + 'appendSignature', formdata, {
          responseType: 'text',
        })
        .subscribe(
          (sfdt: string) => {
            // if (this.isValidSFDTResponse(data)) {
            //   const decodedSFDT = atob(data.sfdt); // Decode the base64-encoded SFDT
            //   const parsedSFDT = JSON.parse(decodedSFDT); // Parse it to JSON
            //   this.container.documentEditor.open(JSON.stringify(parsedSFDT));
            // } else {
            //   console.error('Invalid SFDT format:', data);
            //   alert('Failed to import: Invalid SFDT format.');
            // }
            this.container.documentEditor.open(sfdt);
            this.toast.content = 'Document has approved!';
            this.toast.title = 'Success';
            this.toast.cssClass = 'e-toast-success';
            this.toast.show();
            // this.backToDashboard();
          },
          (error: any) => {
            this.toast.content = 'Something went wrong!';
            this.toast.title = 'Error';
            this.toast.cssClass = 'e-toast-danger';
            this.toast.show();
            console.error('Error during conversion:', error);
            if (error.status === 0) {
              console.error('Network error or CORS issue');
            } else {
              console.error('API error:', error.status, error.message);
            }
          }
        );
    });
  }

  isValidSFDTResponse(data: any): boolean {
    if (!data || typeof data !== 'object' || !data.sfdt) {
      return false; // Check if sfdt key exists
    }

    try {
      const decoded = atob(data.sfdt); // Decode base64
      const parsed = JSON.parse(decoded); // Try parsing JSON
      return (
        parsed && typeof parsed === 'object' && Array.isArray(parsed.sections)
      ); // Check essential SFDT structure
    } catch (e) {
      console.error('SFDT parsing error:', e);
      return false;
    }
  }

  backToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }
  getPreviousUrl(): string | null {
    return this.history.length > 1
      ? this.history[this.history.length - 2]
      : null;
  }
  // Trigger file input click event
  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.importDocument(file);
    }
  }
  uploadDocument() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.docx';
    fileInput.style.display = 'none';
    fileInput.addEventListener('change', (event: any) =>
      this.importDocument(event.target.files[0])
    );
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  }
  importDocument(file: File) {
    const formData = new FormData();
    formData.append('files', file);

    this.http
      .post(this.container.serviceUrl + 'Import1', formData, {
        responseType: 'text',
      })
      .subscribe((sfdt: string) => {
        this.container.documentEditor.open(sfdt);
      });
  }
}
