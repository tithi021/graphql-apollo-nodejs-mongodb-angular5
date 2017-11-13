import { Component, TemplateRef } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import * as Query from './global-query';
import 'rxjs/add/operator/map';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  users: Array<any> = [];
  user: any = {};
  name: any;
  modalRef: BsModalRef;

  constructor(private apollo: Apollo,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getUsers();
  }

  createUser(value) {
    this.apollo.mutate({
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
    }).subscribe(({ data }) => {
      this.closeFirstModal();
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }

  removeUser(id) {
    console.log(Query.removeUser)
    this.apollo.mutate({
      mutation: Query.removeUser,
      variables: {
        _id: id
      },
      // update: (proxy, { data: { removeUser } }) => {
      //   // Read the data from our cache for this query.
      //   const data: any = proxy.readQuery({ query: Query.Users });

      //   var index = data.users.map(function (x) { return x._id; }).indexOf(user._id);

      //   data.users.splice(index, 1);

      //   // Write our data back to the cache.
      //   proxy.writeQuery({ query: Query.Users, data });
      // }
    }).subscribe(({ data }) => {
      console.log(data)
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }

  showEditUserForm(user, template) {
    this.name = user.name;
    this.user = user;
    this.modalRef = this.modalService.show(template);
  }

  updateUser(user) {
    console.log(this.user._id)
    console.log(user)
    this.apollo.mutate({
      mutation: Query.updateUser,
      variables: {
        _id: this.user._id,
        name: user
      },
      update: (proxy, { data: { updateUser } }) => {
        // Read the data from our cache for this query.
        const data: any = proxy.readQuery({ query: Query.Users });

        var index = data.users.map(function (x) { return x._id; }).indexOf(this.user._id);
        data.users[index].name = user;

        // Write our data back to the cache.
        proxy.writeQuery({ query: Query.Users, data });
      }
    }).subscribe(({ data }) => {
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
    console.log(Query.Users)
    this.apollo.watchQuery({ query: Query.Users })
      .valueChanges
      .map((result: any) => result.data.users).subscribe((data) => {
        this.users = data;
        console.log(this.users)
      })
  }

  // Open Modal
  openModal(template: TemplateRef<any>) {
    this.name = '';
    this.user = {};
    this.modalRef = this.modalService.show(template);
  }

  closeFirstModal() {
    this.modalRef.hide();
    this.modalRef = null;
  }
}
