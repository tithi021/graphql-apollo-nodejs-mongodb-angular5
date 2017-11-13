import { Component, TemplateRef } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as Query from './global-query';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  modalRef: BsModalRef;
  users: Array<any> = []; // List of Users
  user: any = {};
  name: any;

  constructor(private apollo: Apollo,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getUsers();
  }

  /**
   * Create User
   * @param value     Name of User
   */
  createUser(value) {
    this.apollo
      .mutate({
        mutation: Query.addUser,
        variables: {
          name: value
        },
        update: (proxy, { data: { addUser } }) => {
          // Read the data from our cache for this query.
          const data: any = proxy.readQuery({ query: Query.Users });

          data.users.push(addUser);

          // Write our data back to the cache.
          proxy.writeQuery({ query: Query.Users, data });
        }
      })
      .subscribe(({ data }) => {
        this.closeFirstModal(); // Close Modal
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
  }

  /**
   * Remove User
   * @param id 
   */
  removeUser(id) {
    this.apollo
      .mutate({
        mutation: Query.removeUser,
        variables: {
          id: id
        },
        update: (proxy, { data: { removeUser } }) => {
          // Read the data from our cache for this query.
          const data: any = proxy.readQuery({ query: Query.Users });

          var index = data.users.map(function (x) { return x.id; }).indexOf(id);

          data.users.splice(index, 1);

          // Write our data back to the cache.
          proxy.writeQuery({ query: Query.Users, data });
        }
      })
      .subscribe(({ data }) => {
        console.log(data)
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
  }

  /**
   * Edit User Form
   * @param user 
   * @param template 
   */
  showEditUserForm(user, template) {
    this.name = user.name;
    this.user = user;
    this.modalRef = this.modalService.show(template);
  }

  /**
   * Update User
   * @param user 
   */
  updateUser(user) {
    this.apollo
      .mutate({
        mutation: Query.updateUser,
        variables: {
          id: this.user.id,
          name: user
        },
        update: (proxy, { data: { updateUser } }) => {
          // Read the data from our cache for this query.
          const data: any = proxy.readQuery({ query: Query.Users });

          var index = data.users.map(function (x) { return x.id; }).indexOf(this.user.id);

          data.users[index].name = user;

          // Write our data back to the cache.
          proxy.writeQuery({ query: Query.Users, data });
        }
      })
      .subscribe(({ data }) => {
        this.closeFirstModal();
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
  }

  /**
   * ----------------------------------------------------
   * Get All Users
   * ----------------------------------------------------
   * @method getUsers
   */
  getUsers() {
    this.apollo.watchQuery({ query: Query.Users })
      .valueChanges
      .map((result: any) => result.data.users).subscribe((data) => {
        this.users = data;
      })
  }

  // Open Modal
  openModal(template: TemplateRef<any>) {
    this.name = '';
    this.user = {};
    this.modalRef = this.modalService.show(template);
  }

  // Close Modal
  closeFirstModal() {
    this.modalRef.hide();
    this.modalRef = null;
  }
}
