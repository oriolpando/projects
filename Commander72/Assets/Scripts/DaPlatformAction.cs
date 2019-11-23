using UnityEngine;
using System.Collections;

[RequireComponent(typeof(Animator))]
public class DaPlatformAction : MonoBehaviour
{

    private Animator animator;

        void Start()
    {

        animator = GetComponent<Animator>();
    }

    public void Plat()
    {
        animator.SetTrigger("Plat");
    }

    public void Plat1()
    {
        animator.SetTrigger("Plat1");
    }

    public void Plat2()
    {
        animator.SetTrigger("Plat2");
    }
}
