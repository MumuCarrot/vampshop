import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { StoreComponent } from "./store.component";

@Component({
  selector: "search-result-comp",
  standalone: true,
  imports: [StoreComponent],
  templateUrl: "./searchresult.component.html",
  styleUrls: ["./searchresult.component.css"]
})
export class SearchResultComponent implements OnInit {
    searchQuery: string = '';

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.searchQuery = this.route.snapshot.paramMap.get('str') ?? '';
    }
}