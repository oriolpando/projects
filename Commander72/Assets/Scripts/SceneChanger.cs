using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneChanger : MonoBehaviour
{

    public Animator animator;
    private int levelToLoad;

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.U))
        {
            if (SceneManager.GetActiveScene().buildIndex < 1)
            {

                FadeToLevel(SceneManager.GetActiveScene().buildIndex + 1);
            }
        }
    }

    public void FadeToLevel(int levelIndex)
    {

        levelToLoad = levelIndex;
        animator.SetTrigger("FadeOutTrigger");

    }

    public void OnFadeComplete()
    {

        SceneManager.LoadScene(levelToLoad);

    }
}

