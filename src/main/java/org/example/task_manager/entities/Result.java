package org.example.task_manager.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity(name = "results")
public final class Result {

    public Result() {
    }

    public Result(String title, String description, Project project) {
        this.title = title;
        this.description = description;
        this.project = project;
    }


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;

    @ManyToOne
    private Project project;

    @JsonManagedReference
    @ManyToMany()
    @JoinTable(
            name = "assigned_user",
            joinColumns = @JoinColumn(name = "result_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> users = new HashSet<>();

    @JsonBackReference
    @ManyToMany()
    @JoinTable(
            name = "dependent_result_codependent_result",
            joinColumns = @JoinColumn(name = "codependent_result_id"),
            inverseJoinColumns = @JoinColumn(name = "dependent_result_id")
    )
    private Set<Result> dependentResults = new HashSet<>();

    @ManyToMany(mappedBy = "dependentResults")
    private Set<Result> codependentResults = new HashSet<>();


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public Set<Result> getDependentResults() {
        return dependentResults;
    }

    public Set<Result> getCodependentResults() {
        return codependentResults;
    }

    public void setCodependentResults(Set<Result> codependentResults) {
        this.codependentResults = codependentResults;
    }
}
